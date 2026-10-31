import { Router } from "express";
import { 
    sendFriendRequest, 
    acceptFriendRequest, 
    rejectFriendRequest, 
    unfriend 
} from "../Controllers/friend.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const friendRouter: Router = Router();

friendRouter.post("/request/send", authUser, sendFriendRequest);
friendRouter.post("/request/accept", authUser, acceptFriendRequest);
friendRouter.post("/request/reject", authUser, rejectFriendRequest);
friendRouter.delete("/unfriend", authUser, unfriend);

export default friendRouter;
