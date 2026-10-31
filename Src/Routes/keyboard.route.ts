import { Router } from "express";
import { createKeyboardCollectionControler, getAllKeyboards, getSingleKeyboard } from "../Controllers/keyboard.controller.js";

const keyboardRouter: Router = Router();

keyboardRouter.post("/", createKeyboardCollectionControler)
keyboardRouter.get("/", getAllKeyboards)
keyboardRouter.get("/:id", getSingleKeyboard)

export default keyboardRouter
