import { Router } from "express";
import { productsController } from "../controllers/index.js";

const productsRouter = Router();

productsRouter.get("/", productsController.find);

export { productsRouter };
