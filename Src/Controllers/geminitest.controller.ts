import type { Request, Response } from "express";
import { getGenAI } from "../Gemini Ai/gemini.js";
import AllProduct from '../Models/all.model.js';

/**
 * @name create recommendationController
 * @description this controller is used to create recommendation for the user
 * @route POST /api/gemini-test
 * @access private
 * @param req 
 * @param res 
 */
export const geminiTestController = async (req: Request, res: Response) => {
    try {
        const { userPrompt } = req.body;
        const products = await AllProduct.find();
        const productList = JSON.stringify(products.map((p: any) => ({
            name: p.name,
            price: p.price,
            image: p.image,
            category: p.category,
            description: p.description,
            quantity: p.quantity,

        })))
        const prompt = `You are a helpful E-Commerce assistant.
        Here is the list of products available in our store:
        ${productList}
        
        Now answer the user's question based on this product list:
        ${userPrompt}
        
        based only our product above , recommend the best matches.
        if the user ask about something not in the product List, say that we dont have it`;
        const response = await getGenAI().models.generateContent({
            model: "gemini-1.5-flash",
            contents: prompt,

        });
        return res.status(200).json({
            success: true,
            aiResponse: response.text
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "AI ERROR"
        })
    }
}