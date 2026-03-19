import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../Models/user.model.js";
import tokenBlacklistModel from "../Models/Blacklist.model.js";
import keyboardModel from "../Models/ketboard.model.js";
import jwt from "jsonwebtoken";
import { type CustomRequest } from "../middleware/auth.middleware.js";
import productModel from "../Models/all.model.js";

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
        const { name, price, image, stock, category, brand, switchType, layout, description, isFeatured } = req.body
        if (!name || !price || !image || !stock || !category || !brand || !switchType || !layout || !description || !isFeatured) {
            return res.status(400).json({ message: "please provide all the required fields" })
        }
        const keyboard = await keyboardModel.create({
            name,
            price,
            image,
            stock,
            category,
            brand,
            layout,
            switchType,
            description,
            isFeatured,
        })
        return res.status(201).json({
            message: "Successful",
            keyboard
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
/**
 * @name CreateAllProductController
 * @desc for all product
 * @access public
 */

export const CreateAllProductController = async (req: Request, res: Response) => {
    try {
        const { name, price, image, stock, description, category, brand, } = req.body
        if (!name || !price || !image || !stock || !description || !category || !brand) {
            return res.status(201).json({ massage: "Nothing posted" })
        }
        const product = await productModel.create({
            name,
            price,
            stock,
            image,
            description,
            brand,
            category,

        })
        return res.status(201).json({
            message: "Product posted successfully",
            products: product
        })
    }
    catch (error: any) {
        return res.status(500).json({ massage: "IT HAVE PROBLEM" })
    }
}
/**
 * @name getallProduct
 * @desc get all product from here 
 * @acess public
 */

export const getAllProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { category, brand, searchTerm } = req.query;
        let query: any = {};
        if (category) query.category = category;
        if (brand) query.brand = brand;
        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        }
        const products = await productModel.find(query).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    }
    catch (error: any) {
        return res.status(500).json({ message: "Error fetching products", error: error.message })
    }
}

/**
 * @name getSingleProductController
 * @desc for every single product
 * @access Public
 */
export const getSingleProductController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            success: true,
            product
        });
    } catch (error: any) {
        return res.status(500).json({ message: "Invalid ID or Server Error", error: error.message });
    }
};
