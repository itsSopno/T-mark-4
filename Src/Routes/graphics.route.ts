import { Router } from "express";
import { createGaphicsCardCollectionController, getAllGraphicsCards, getSingleGraphicsCard } from "../Controllers/graphicsCard.controller.js";

const graphicsRouter: Router = Router();

graphicsRouter.post("/", createGaphicsCardCollectionController);
graphicsRouter.get("/", getAllGraphicsCards);
graphicsRouter.get("/:id", getSingleGraphicsCard);

export default graphicsRouter
