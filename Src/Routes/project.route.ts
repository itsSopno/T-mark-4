import { Router } from "express";
import { 
    getAllProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject 
} from "../Controllers/ProjectDetails.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const projectRouter = Router();

projectRouter.get("/all", getAllProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.post("/create", authUser, createProject);
projectRouter.put("/update/:id", authUser, updateProject);
projectRouter.delete("/delete/:id", authUser, deleteProject);

export default projectRouter;
