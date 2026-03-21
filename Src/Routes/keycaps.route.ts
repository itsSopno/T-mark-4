import { Router } from "express";
import { createKeycapsCollectionController, getAllKeyCapsCollectionController, getSingleKeycapController, updateKeycapController, deleteKeycapController } from "../Controllers/keycap.controller.js";
const keycapsRouter: Router = Router();

keycapsRouter.post("/", createKeycapsCollectionController)
keycapsRouter.get("/", getAllKeyCapsCollectionController)
keycapsRouter.get("/:id", getSingleKeycapController)
keycapsRouter.put("/:id", updateKeycapController)
keycapsRouter.delete("/:id", deleteKeycapController)

export default keycapsRouter