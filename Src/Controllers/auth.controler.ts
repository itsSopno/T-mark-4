import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../Models/user.model.js";
import tokenBlacklistModel from "../Models/Blacklist.model.js";
import jwt from "jsonwebtoken";

/**
 * @name registerUserController
 * @desc register a new user
 * @route POST /api/v1/auth/register
 * @access public
 */
export const registerUserController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ masssage: "Please provide name , email , and password" })
        }
        const isUserExist = await userModel.findOne({
            $or: [{
                email: email
            }, { name: name }]
        })
        if (isUserExist) {
            return res.status(400).json({ massage: "User Already Exists" })
        }
        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            name,
            email,
            password: hash
        })
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
        res.cookie("Token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
        return res.status(201).json({
            massage: "User Registered Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error: any) {
        return res.status(500).json({ massage: "Internal Server Error", error: error.massage })
    }
}