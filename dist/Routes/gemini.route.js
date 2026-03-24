import { Router } from "express";
import { geminiTestController } from "../Controllers/geminitest.controller.js";
const geminiRouter = Router();
geminiRouter.post("/recommend", geminiTestController);
export default geminiRouter;
//# sourceMappingURL=gemini.route.js.map