import { Router } from "express";
import { registerUserController, LoginUserController, logoutUserController, getMeController } from "../Controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();
authRouter.post("/register", registerUserController);
authRouter.post("/login", LoginUserController);
authRouter.get("/logout", logoutUserController);
authRouter.get("/getMe", authUser, getMeController);
export default authRouter;
//# sourceMappingURL=auth.route.js.map