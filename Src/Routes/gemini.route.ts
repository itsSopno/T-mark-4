import { Router } from "express";
import { geminiTestController } from "../Controllers/geminitest.controller.js";

const geminiRouter: Router = Router();

geminiRouter.post("/recommend", geminiTestController);

export default geminiRouter;
