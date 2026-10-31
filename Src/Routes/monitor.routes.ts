import Router from "express";
import { createMonitorCollectionController, getAllMonitors, getSingleMonitor } from "../Controllers/montior.controller.js"

const monitorRouter = Router();

monitorRouter.post("/", createMonitorCollectionController);
monitorRouter.get("/", getAllMonitors);
monitorRouter.get("/:id", getSingleMonitor);

export default monitorRouter;
