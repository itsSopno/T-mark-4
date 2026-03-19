// import mongoose from 'mongoose';

// async function connectDB(): Promise<void> {
//     try {
//         const mongoUri = process.env.MONGO_URI as string;

//         if (!mongoUri) {
//             throw new Error("MONGO_URI is not defined in environment variables");
//         }

//         // mongoose.connect() কল করার সময়ই MongoDB আপনার URI তে থাকা ডাটাবেসটি 
//         // অটোমেটিক সিলেক্ট করে নেয় (যা 'use myDatabaseName' এর কাজ করে)
//         const conn = await mongoose.connect(mongoUri);
//         console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
//         const db = conn.connection.db;

//         if (db) {
//             const collectionName = "products";
//             const collections = await db.listCollections({ name: collectionName }).toArray();

//             if (collections.length === 0) {

//                 await db.createCollection(collectionName);
//                 console.log(`🚀 Collection '${collectionName}' created!`);
//             } else {
//                 console.log(`ℹ️ Collection '${collectionName}' already exists in ${db.databaseName}`);
//             }
//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             console.error("❌ Error connecting to MongoDB:", error.message);
//         } else {
//             console.error("❌ An unknown error occurred while connecting to MongoDB");
//         }
//         process.exit(1);
//     }
// }

// export default connectDB;
import mongoose from 'mongoose';

async function connectDB(): Promise<void> {
    try {
        const mongoUri = process.env.MONGO_URI as string;

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        // mongoose.connect() রিটার্ন করে একটি connection অবজেক্ট
        const conn = await mongoose.connect(mongoUri);
        console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);

        // ডাটাবেস এর নাম এবং কালেকশন চেক করার সঠিক উপায়
        const db = conn.connection.db;
        const dbName = conn.connection.name; // ডাটাবেসের নাম দেখাবে

        if (db) {
            const collectionName = "products";
            const collections = await db.listCollections({ name: collectionName }).toArray();

            if (collections.length === 0) {
                await db.createCollection(collectionName);
                console.log(`🚀 Collection '${collectionName}' created in ${dbName}!`);
            } else {
                console.log(`ℹ️ Collection '${collectionName}' already exists in ${dbName}`);
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ MongoDB Connection Error:", error.message);
        }
        process.exit(1);
    }
}

export default connectDB;