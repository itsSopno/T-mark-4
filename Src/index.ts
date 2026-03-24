import express, { type Application, type Request, type Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './Routes/auth.route.js'
import keyboardRouter from './Routes/keyboard.route.js'
import keycapsRouter from './Routes/keycaps.route.js';
import allproductRouter from './Routes/allproduct.route.js';
import paymentRouter from './Routes/payment.route.js';
import googleRouter from './Routes/google.route.js';
import TopRouter from './Routes/topRouter.js';
import geminiRouter from './Routes/gemini.route.js';

// Configure dotenv
dotenv.config();

const app: Application = express();
/**
 * @route middle ware
 */
app.use(express.json());
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
/**
 * @route using all routes
 */
app.use("/api", authRouter)
app.use("/api/google", googleRouter)
app.use("/api/keyboard", keyboardRouter)
app.use("/api/keycaps", keycapsRouter)
app.use("/api/all-products", allproductRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/top-products", TopRouter)
app.use("/api/ai", geminiRouter)
/**
 * @route test router
 */
app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Server is running" })
})
export default app;