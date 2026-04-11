import type { Request, Response } from "express";
import UserDataModel from "../Models/userdata.model.js";
import { NotificationModel } from "../Models/notification.model.js";

// @route POST /api/friend/request/send
export const sendFriendRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { senderEmail, receiverEmail } = req.body;

        if (senderEmail === receiverEmail) {
            return res.status(400).json({ success: false, message: "You cannot send a request to yourself." });
        }

        const receiver = await UserDataModel.findOne({ email: receiverEmail });
        const sender = await UserDataModel.findOne({ email: senderEmail });

        if (!receiver || !sender) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if already friends
        if (receiver.friends.includes(senderEmail)) {
            return res.status(400).json({ success: false, message: "Already friends." });
        }

        // Check if request already pending
        const alreadyPending = receiver.friendRequests.some(req => req.from === senderEmail && req.status === "pending");
        if (alreadyPending) {
            return res.status(400).json({ success: false, message: "Request already pending." });
        }

        // Add to receiver's requests
        receiver.friendRequests.push({
            from: senderEmail,
            userName: sender.name as string,
            userImage: sender.image as string,
            status: "pending",
            createdAt: new Date()
        });

        await receiver.save();

        // Create Notification
        await NotificationModel.create({
            recipientId: receiverEmail,
            senderId: senderEmail,
            type: "LIKE", 
            title: "New Friend Request",
            content: `${sender.name} wants to be your friend.`
        });

        return res.status(200).json({ success: true, message: "Friend request sent successfully." });

    } catch (error: any) {
        console.error("Error sending friend request:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// @route POST /api/friend/request/accept
export const acceptFriendRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userEmail, senderEmail } = req.body;

        const user = await UserDataModel.findOne({ email: userEmail });
        const sender = await UserDataModel.findOne({ email: senderEmail });

        if (!user || !sender) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // 1. Remove from pending requests
        user.friendRequests = user.friendRequests.filter(req => req.from !== senderEmail);

        // 2. Add to mutual friends list
        if (!user.friends.includes(senderEmail)) user.friends.push(senderEmail);
        if (!sender.friends.includes(userEmail)) sender.friends.push(userEmail);

        await user.save();
        await sender.save();

        // 3. Notify sender that request was accepted
        await NotificationModel.create({
            recipientId: senderEmail,
            senderId: userEmail,
            type: "COMMENT",
            title: "Request Accepted",
            content: `${user.name} accepted your friend request.`
        });

        return res.status(200).json({ success: true, message: "Friend request accepted.", friends: user.friends });

    } catch (error: any) {
        console.error("Error accepting friend request:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// @route POST /api/friend/request/reject
export const rejectFriendRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userEmail, senderEmail } = req.body;
        const user = await UserDataModel.findOne({ email: userEmail });
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        user.friendRequests = user.friendRequests.filter(req => req.from !== senderEmail);
        await user.save();

        return res.status(200).json({ success: true, message: "Friend request rejected." });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// @route DELETE /api/friend/unfriend
export const unfriend = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userEmail, friendEmail } = req.body;
        const user = await UserDataModel.findOne({ email: userEmail });
        const friend = await UserDataModel.findOne({ email: friendEmail });

        if (user) user.friends = user.friends.filter(email => email !== friendEmail);
        if (friend) friend.friends = friend.friends.filter(email => email !== userEmail);

        await user?.save();
        await friend?.save();

        return res.status(200).json({ success: true, message: "Unfriended successfully." });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
