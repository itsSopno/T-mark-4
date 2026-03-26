import { GoogleGenAI } from "@google/genai";

export const getGenAI = () => new GoogleGenAI({
    apiKey: process.env.GEMINI_API as string,
    apiVersion: "v1beta"
});

export const testGemini = async () => {
    try {
        console.log("Testing Gemini API connection...");
        const ai = getGenAI();

        // List models to see what's available
        const models = await ai.models.list();
        console.log("Available Models:");
        for await (const model of models) {
            console.log(`- ${model.name} (${model.displayName})`);
        }

        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: "Hello, how are you ?"
        });
        const text = result.text || result.candidates?.[0]?.content?.parts?.[0]?.text || "No text available";
        console.log("✅ Gemini Response:", text);
    } catch (err: any) {
        console.error("❌ Gemini Test Error:", err.message || err);
    }
};
