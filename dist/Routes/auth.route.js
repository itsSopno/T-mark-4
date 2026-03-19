import { Router } from "express";
import { registerUserController, LoginUserController, logoutUserController, getMeController, createKeyboardCollectionControler, getAllKeyboards, getSingleKeyboard, CreateAllProductController, getAllProduct, getSingleProductController } from "../Controllers/auth.controler.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();
authRouter.post("/register", registerUserController);
authRouter.post("/login", LoginUserController);
authRouter.get("/logout", logoutUserController);
authRouter.get("/getMe", authUser, getMeController);
authRouter.post("/createKeyboard", createKeyboardCollectionControler);
authRouter.get("/getallkeyboard", getAllKeyboards);
authRouter.get("/getsinglekeyboard/:id", getSingleKeyboard);
authRouter.post("/allproduct", CreateAllProductController);
authRouter.get("/allproduct", getAllProduct);
authRouter.get("/allproduct/:id", getSingleProductController);
export default authRouter;
//# sourceMappingURL=auth.route.js.map