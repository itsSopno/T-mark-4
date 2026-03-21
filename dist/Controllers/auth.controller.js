import bcrypt from "bcryptjs";
import userModel from "../Models/user.model.js";
import tokenBlacklistModel from "../Models/Blacklist.model.js";
import jwt from "jsonwebtoken";
import {} from "../middleware/auth.middleware.js";
/**
 * @name registerUserController
 * @desc register a new user
 * @route POST /api/v1/auth/register
 * @access public
 */
export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name , email , and password" });
        }
        const isUserExist = await userModel.findOne({
            $or: [{
                    email: email
                }, { name: name }]
        });
        if (isUserExist) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hash
        });
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("Token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
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
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
/***
 * @NAME loginuser Controll
 * @desc login a user
 * @access public
 */
export const LoginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "passowrd is not valid" });
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.cookie("token", token, {
            httpOnly: true,
        });
        return res.status(200).json({
            message: "User Logged In successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
/**
 * @name logoutUserCotroller
 * @desc logout a user
 * @access public
*/
export const logoutUserController = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            await tokenBlacklistModel.create({ token });
            res.clearCookie("token");
            return res.status(200).json({ message: "User logged out successfully" });
        }
        return res.status(200).json({ message: " no token found" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
/***
 * @name getMe controller
 * @desc get user profile
 * @access private
 */
export const getMeController = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=auth.controller.js.map