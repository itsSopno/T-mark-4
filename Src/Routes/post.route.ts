import { Router } from "express";
import { createPost, getAllPosts, deletePostController, getPostByUserEmail, toggleLike, addComment } from "../Controllers/post.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const Postrouter = Router();

Postrouter.post("/create", authUser, createPost);
Postrouter.get("/get", getAllPosts);
Postrouter.delete("/delete/:id", authUser, deletePostController);
Postrouter.get("/get/:email", getPostByUserEmail);

// New Routes
Postrouter.patch("/:id/like", authUser, toggleLike);
Postrouter.post("/:id/comment", authUser, addComment);

export default Postrouter;