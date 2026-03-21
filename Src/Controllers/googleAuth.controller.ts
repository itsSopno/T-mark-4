import type { Request, Response, NextFunction } from "express"
import googleModel from "../Models/google.model.js"
import userModel from "../Models/user.model.js"
import jwt from "jsonwebtoken"

/**
 * @name GoogleRegesterController
 * @desc post google Regester data, It will work for both regester and login
 * 
 *@access Public
 */
export const GoogleAuthController = async (req: Request, res: Response) => {
    try {
        const { googleId, email, name, image } = req.body;

        if (!googleId || !email || !name || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }


        let user = await googleModel.findOne({ email });

        if (!user) {
            user = await googleModel.create({
                googleId,
                email,
                name,
                image
            });
        } else {
            user.image = image;
            user.name = name;
            await user.save();
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );


        res.cookie("Token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });

        return res.status(200).json({
            message: "Authentication Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }
        });

    } catch (error) {
        console.error("Auth Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * @name Get GoogleLoginData controller
 * @desc user can get here google login data 
 * @route GET api/Google
 * @access proivate
 * 
 */
export const getMe = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req as any).userId;
        const user = await googleModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: (user as any).role || 'user'
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * @name GoogleLogoutController
 * @des for logout system
 * @acces private
 * @route GET api/Google/Logout
 */
export const LogoutController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        res.clearCookie("Token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully! See you again, Lando fan! 🏎️"
        });
    } catch (error) {
        res.status(500).json({ message: "Logout failed" });
    }
};