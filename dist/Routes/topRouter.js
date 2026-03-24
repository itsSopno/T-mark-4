import { Router } from "express";
import { createTopProductController, getAllTopProductController, getSingleTopProductController } from "../Controllers/top.controller.js";
const TopRouter = Router();
TopRouter.post("/", createTopProductController);
TopRouter.get("/", getAllTopProductController);
TopRouter.get("/:id", getSingleTopProductController);
export default TopRouter;
//# sourceMappingURL=topRouter.js.map