import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../Models/user.model.js";
import tokenBlacklistModel from "../Models/Blacklist.model.js";
import keyboardModel from "../Models/ketboard.model.js";
import jwt from "jsonwebtoken";
import { type CustomRequest } from "../middleware/auth.middleware.js";

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
            return res.status(400).json({ message: "Please provide name , email , and password" })
        }
        const isUserExist = await userModel.findOne({
            $or: [{
                email: email
            }, { name: name }]
        })
        if (isUserExist) {
            return res.status(400).json({ message: "User Already Exists" })
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
            message: "User Registered Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error: any) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

/***
 * @NAME loginuser Controll
 * @desc login a user
 * @access public 
 */
export const LoginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "passowrd is not valid" })
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET as string,
            {
                expiresIn: "1d"
            }
        )
        res.cookie("token", token, {
            httpOnly: true,

        })
        return res.status(200).json({
            message: "User Logged In successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })

    }
}
/** 
 * @name logoutUserCotroller 
 * @desc logout a user
 * @access public 
*/
export const logoutUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const token = req.cookies.token;
        if (token) {
            await tokenBlacklistModel.create({ token });
            res.clearCookie("token");
            return res.status(200).json({ message: "User logged out successfully" })
        }

        return res.status(200).json({ message: " no token found" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
};
/***
 * @name getMe controller 
 * @desc get user profile 
 * @access private 
 */
export const getMeController = async (req: CustomRequest, res: Response): Promise<Response | void> => {
    try {
        const user = await userModel.findById(req.user?.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User found",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @name createKeyboardCollectionControler
 * @desc create keyboard collection
 * @access public
 */
export const createKeyboardCollectionControler = async (req: Request, res: Response) => {
    try {
        const products = Array.isArray(req.body) ? req.body : [req.body];

        const processedProducts = products.map(p => ({
            name: p.name,
            price: p.price ?? 199, // Default price if missing
            image: p.image,
            stock: p.stock ?? 100, // Default stock if missing
            category: p.category ?? "Keyboards",
            brand: p.brand ?? "Tech Gear",
            layout: p.layout ?? "75%",
            switchType: p.switchType ?? "Mechanical",
            description: p.description ?? "High-end tech peripheral.",
            isFeatured: p.isFeatured ?? false,
        }));

        // Basic validation
        for (const p of processedProducts) {
            if (!p.name || !p.image || !p.description) {
                return res.status(400).json({ message: "Missing required fields (name, image, or description) in one or more items." })
            }
        }

        const keyboards = await keyboardModel.insertMany(processedProducts);

        return res.status(201).json({
            message: "Successful",
            count: keyboards.length,
            keyboards
        })

    } catch (error: any) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
/**
 * @name getallkeybaord
 * @desc get all keyboard collection 
 * @access public
 */
export const getAllKeyboards = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { category, brand, searchTerm } = req.query;
        let query: any = {};

        // ১. ক্যাটাগরি বা ব্র্যান্ড অনুযায়ী ফিল্টার
        if (category) query.category = category;
        if (brand) query.brand = brand;

        // ২. সার্চ সুবিধা (নাম বা ডেসক্রিপশনে খুঁজবে)
        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        const keyboards = await keyboardModel.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: keyboards.length,
            keyboards
        });
    } catch (error: any) {
        return res.status(500).json({ message: "Error fetching keyboards", error: error.message });
    }
};

/**
 * @name getSingleKeyboard
 * @desc get a single keyboard
 * @access public
 */
export const getSingleKeyboard = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const keyboard = await keyboardModel.findById(id);

        if (!keyboard) {
            return res.status(404).json({ message: "Keyboard not found" });
        }

        return res.status(200).json({
            success: true,
            keyboard
        });
    } catch (error: any) {
        return res.status(500).json({ message: "Invalid ID or Server Error", error: error.message });
    }
};
