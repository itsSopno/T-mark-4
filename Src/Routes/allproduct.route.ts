import { Router } from "express";
import { CreateAllProductController, getAllProduct, getSingleProductController } from "../Controllers/allProduct.controller.js";

const allproductRouter: Router = Router();

allproductRouter.post("/create", CreateAllProductController)
allproductRouter.get("/getall", getAllProduct)
allproductRouter.get("/getall/:id", getSingleProductController)

export default allproductRouter;
