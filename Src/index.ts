import express, { type Application, type Request, type Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './Routes/auth.route.js'

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
/**
 * @route test router
 */
app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Server is running" })
})
export default app;