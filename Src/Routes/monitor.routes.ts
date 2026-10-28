import Router from "express";
import {createMonitorCollectionController, getAllMonitors, getSingleMonitor} from "../Controllers/montior.controller.js"
import {isAdmin} from "../middleware/post.middleware.js"
import {authUser} from "../middleware/auth.middleware.js"
const monitorRouter = Router();

monitorRouter.post("/", authUser, isAdmin, createMonitorCollectionController);
monitorRouter.get("/", getAllMonitors);
monitorRouter.get("/:id", getSingleMonitor);

export default monitorRouter;