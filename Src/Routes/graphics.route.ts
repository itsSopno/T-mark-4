import {Router} from "express";
import { createGaphicsCardCollectionController, getAllGraphicsCards } from "../Controllers/graphicsCard.controller.js";
import { isAdmin } from "../middleware/post.middleware.js";
import { authUser } from "../middleware/auth.middleware.js";

const graphicsRouter:Router = Router();
graphicsRouter.post("/", authUser, isAdmin, createGaphicsCardCollectionController);
graphicsRouter.get("/", getAllGraphicsCards);