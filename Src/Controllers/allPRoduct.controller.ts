import type { Request, Response } from "express";
import productModel from "../Models/all.model.js";

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