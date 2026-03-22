import { Router } from "express";
import { CreateAllProductController, getAllProduct, getSingleProductController } from "../Controllers/allProduct.controller.js";
const allproductRouter = Router();
allproductRouter.post("/create", CreateAllProductController);
allproductRouter.get("/getall", getAllProduct);
allproductRouter.get("/getSingle/:id", getSingleProductController);
export default allproductRouter;
//# sourceMappingURL=allproduct.route.js.map