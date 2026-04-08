import type { Request, Response } from "express";
import { getGenAI } from "../Gemini Ai/gemini.js";
import AllProduct from '../Models/all.model.js';

/**
 * @name geminiTestController
 * @description This controller is used to provide AI-powered product recommendations
 * @route POST /api/gemini-test
 * @access private
 */
export const geminiTestController = async (req: Request, res: Response) => {
    try {
        const { userPrompt } = req.body;
        const products = await AllProduct.find();
        const productList = JSON.stringify(products.map((p: any) => ({
            name: p.name,
            price: p.price,
            description: p.description,
            quantity: p.quantity,

        })))
        const prompt = `You are a helpful E-Commerce assistant. 
Our available products: ${productList}

User Input: "${userPrompt}"

Reply naturally. If it's a greeting, greet back. If they ask about products, recommend from the available list. If asked about something we don't have, politely inform them it's unavailable. Keep it concise.`;
        const response = await getGenAI().models.generateContent({
            model: "gemini-2.5-flash",
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