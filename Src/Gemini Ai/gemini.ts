import { GoogleGenAI } from "@google/genai";

export const getGenAI = () => new GoogleGenAI({
    apiKey: process.env.GEMINI_API as string
});

export const testGemini = async () => {
    try {
        const response = await getGenAI().models.generateContent({
             model: "gemini-1.5-flash",
             contents: "Hello, how are you ?"
         });
         console.log("Gemini Response:", response.text);
    } catch (err) {
        console.error("Gemini Error:", err);
    }
};
