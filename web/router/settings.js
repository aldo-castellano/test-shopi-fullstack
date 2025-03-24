import { Router } from "express";
import { settingsController } from "../controllers/index.js";

const settingsRouter = Router();

settingsRouter.get("/", settingsController.find);
settingsRouter.post("/", settingsController.create);

export { settingsRouter };
