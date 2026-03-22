import type { Request, Response } from "express";
import productModel from "../Models/all.model.js";

/**
 * @name CreateAllProductController
 * @desc for all product
 * @access public
 */

export const CreateAllProductController = async (req: Request, res: Response) => {
    try {
        const { name, price, image, quantity, description, category } = req.body
        if (!name || !price || !image || !quantity || !description || !category) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const product = await productModel.create({
            name,
            price,
            image,
            description,
            category,
            quantity: Number(quantity)
        })
        return res.status(201).json({
            message: "Product posted successfully",
            products: product
        })
    }
    catch (error: any) {
        return res.status(500).json({ message: "IT HAVE PROBLEM" })
    }
}
/**
 * @name getallProduct
 * @desc get all product from here 
 * @access public
 */

export const getAllProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { category, searchTerm } = req.query;
        let query: any = {};
        if (category) query.category = category;
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
            product: products
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
            product: product
        });
    } catch (error: any) {
        return res.status(500).json({ message: "Invalid ID or Server Error", error: error.message });
    }
};