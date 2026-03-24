import { GoogleGenAI } from "@google/genai";
const geminkey = process.env.GEMINI_API;
export const genAI = new GoogleGenAI({
    apiKey: geminkey
});
// A test function to verify it works without blocking server startup
export const testGemini = async () => {
    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Hello, how are you ?"
        });
        console.log("Gemini Response:", response.text);
    }
    catch (err) {
        console.error("Gemini Error:", err);
    }
};
export default genAI;
//# sourceMappingURL=gemini.js.map