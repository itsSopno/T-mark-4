import type { Request, Response } from "express";
import UserDataModel from "../Models/userdata.model.js";

/**
 * @name CreateUserDataModel 
 * @desc create a new user data 
 * @route POST/api/
 * @acess Private
 */

export const CreateUserDataModel = async (req: Request, res: Response) => {
    try {
        const { name, email, phoneNumber, address, Bio, image } = req.body;
        if (!name || !email || !phoneNumber || !address || !Bio || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser = await UserDataModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email"
            });
        }
        const newUser = await UserDataModel.create({
            name,
            email,
            phoneNumber,
            address,
            Bio,
            image,
        });
        return res.status(201).json({
            success: true,
            message: "User data saved successfully",
            user: newUser
        });

    } catch (error) {
        console.error("Error in CreateUserDataModel:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * @name getUserfullData
 * @desc get all user data
 * @route get/api/
 * @acess private
 * 
 */

export const getUserFullData = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const user = await UserDataModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            user
        })
    } catch (error) {
        console.error("Error in getUserFullData:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}