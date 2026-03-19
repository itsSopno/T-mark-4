import mongoose from 'mongoose';

async function connectDB(): Promise<void> {
    try {
        const mongoUri = process.env.MONGO_URI as string;

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        // mongoose.connect() কল করার সময়ই MongoDB আপনার URI তে থাকা ডাটাবেসটি 
        // অটোমেটিক সিলেক্ট করে নেয় (যা 'use myDatabaseName' এর কাজ করে)
        const conn = await mongoose.connect(mongoUri);
        console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);

        // ম্যানুয়ালি কালেকশন চেক এবং তৈরি করার লজিক (ঐচ্ছিক)
        const db = conn.connection.db;
        if (db) {
            const collectionName = "products";
            const collections = await db.listCollections({ name: collectionName }).toArray();

            if (collections.length === 0) {
                await db.createCollection(collectionName);
                console.log(`🚀 Collection '${collectionName}' created successfully!`);
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error connecting to MongoDB:", error.message);
        } else {
            console.error("❌ An unknown error occurred while connecting to MongoDB");
        }
        process.exit(1);
    }
}

export default connectDB;