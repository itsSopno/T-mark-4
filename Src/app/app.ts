import dns from 'node:dns';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import app from "../index.js"
import connectDB from '../Config/database.js';
import { testGemini } from '../Gemini Ai/gemini.js';
// DNS সার্ভার সেটআপ
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ES Modules-এ __dirname সেটআপ করার নিয়ম
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env ফাইল কনফিগারেশন
dotenv.config({ path: path.join(__dirname, '../../.env') });

const PORT = process.env.PORT || 10000;

const startServer = async () => {
    try {
        // ডাটাবেস কানেকশন
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
        // testGemini() // Disabled to conserve API quota
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();