import { Server, Socket } from "socket.io";
import { MessageModel } from "../Models/massage.model.js";

// Map to store online users: userId -> socketId
const onlineUsers = new Map<string, string>();

export const initSocket = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Adjust this for production
            methods: ["GET", "POST"]
        }
    });

    console.log("⚓ Socket.io Initialized");

    io.on("connection", (socket: Socket) => {
        console.log("⚡ User Connected:", socket.id);

        // 1. Join Personal Room
        socket.on("join-user", (userId: string) => {
            onlineUsers.set(userId, socket.id);
            socket.join(userId);
            console.log(`👤 User ${userId} joined their personal room`);
            
            // Broadcast online status if needed
            io.emit("user-online", userId);
        });

        // 2. Private Messaging
        socket.on("send-message", async (data: {
            senderId: string;
            receiverId: string;
            message: string;
            image?: string;
        }) => {
            const { senderId, receiverId, message, image } = data;

            try {
                // Save to DB
                const savedMessage = await MessageModel.create({
                    senderId,
                    receiverId,
                    message,
                    image: image || ""
                });

                // Emit to recipient's room
                io.to(receiverId).emit("new-message", savedMessage);
                
                // Emit back to sender (for confirmation/sync)
                socket.emit("message-sent", savedMessage);

                console.log(`📩 Message from ${senderId} to ${receiverId}`);

            } catch (error) {
                console.error("❌ Error sending socket message:", error);
                socket.emit("error", "Failed to send message");
            }
        });

        // 3. Typing Indicator
        socket.on("typing", (data: { senderId: string, receiverId: string }) => {
            io.to(data.receiverId).emit("user-typing", data.senderId);
        });

        // 4. Disconnect
        socket.on("disconnect", () => {
            // Find and remove from onlineUsers
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    io.emit("user-offline", userId);
                    console.log(`👋 User ${userId} Disconnected`);
                    break;
                }
            }
        });
    });

    return io;
};
