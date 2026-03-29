import { Router } from "express";
import { registerUserController, LoginUserController, logoutUserController, getMeController, optionalController } from "../Controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter: Router = Router();
authRouter.post("/register", registerUserController)
authRouter.post("/login", LoginUserController)
authRouter.get("/logout", logoutUserController)
authRouter.get("/getMe", authUser, getMeController)
authRouter.put("/optional", authUser, optionalController)
export default authRouter;