import { type Request, type Response } from "express";
import PostModel from "../Models/post.model.js";

/**
 * @name CreatePost 
 * @desc by this controller , user can post anything
 * @route POST/api/post/create
 * @acess Public
 *  */
export const createPost = async (req: Request, res: Response) => {
    try {
        const { author, content, images } = req.body;

        const newPost = await PostModel.create({
            author,
            content,
            images: images || [],
        });

        return res.status(201).json({
            success: true,
            message: "POST_PUBLISHED: System update complete",
            post: newPost
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * @name getAllPost 
 * @desc by using this controller , user can get every post 
 * @route GET/api/post
 * @acess Public 
 */
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const posts = await PostModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalPosts = await PostModel.countDocuments();

        return res.status(200).json({
            success: true,
            message: "DATA_SYNC_COMPLETE: Stream connected",
            count: posts.length,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            posts
        });

    } catch (error) {
        console.error("Error in getAllPosts:", error);
        return res.status(500).json({
            success: false,
            message: "CONNECTION_FAILED: Error fetching posts from stream"
        });
    }
};

/**
 * @name getPostById
 * @desc by using this controller , user can get specific post 
 * @route GET/api/post/:id
 * @acess Public 
 */
export const getPostByUserEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const posts = await PostModel.find({ "author.email": email }).sort({ createdAt: -1 });

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "NO_POSTS_FOUND: Identity link broken",
            });
        }

        return res.status(200).json({
            success: true,
            message: "DATA_RETRIEVED: Synchronizing user stream...",
            count: posts.length,
            posts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "INTERNAL_ERROR: Connection failed",
        });
    }
};

/**
 * @name deletePost Controller
 * @desc user can delete his own post 
 * @route DELETE/api/post/:id
 * @acess Public
 */
export const deletePostController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedPost = await PostModel.findByIdAndDelete(id);

        if (!deletedPost) return res.status(404).json({ success: false, message: "Post not found" });

        return res.status(200).json({
            success: true,
            message: "POST_TERMINATED: Node removed from stream"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error deleting post" });
    }
};