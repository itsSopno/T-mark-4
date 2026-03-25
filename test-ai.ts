import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API;
console.log("Using API Key:", apiKey ? "FOUND" : "NOT FOUND");

const genAI = new GoogleGenerativeAI(apiKey as string);

async function test() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello?");
        console.log("Success! Response:", result.response.text());
    } catch (err: any) {
        console.error("FAILED! Error details:");
        console.error(err.message || err);
        if (err.response) {
            console.error(JSON.stringify(err.response, null, 2));
        }
    }
}

test();
