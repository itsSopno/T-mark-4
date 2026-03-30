import { Router } from "express";
import { createPost, getAllPosts, deletePostController, getPostByUserEmail } from "../Controllers/post.controller.js";

const Postrouter = Router();

Postrouter.post("/create", createPost);
Postrouter.get("/get", getAllPosts);
Postrouter.delete("/delete/:id", deletePostController);
Postrouter.get("/get/:email", getPostByUserEmail);

export default Postrouter;