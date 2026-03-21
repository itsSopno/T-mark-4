import { Router } from "express";
import { CreateAllProductController, getAllProduct, getSingleProductController } from "../Controllers/allProduct.controller.js";

const allproductRouter: Router = Router();

allproductRouter.post("/", CreateAllProductController)
allproductRouter.get("/", getAllProduct)
allproductRouter.get("/:id", getSingleProductController)

export default allproductRouter;
