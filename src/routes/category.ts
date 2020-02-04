import { IRouter, Router } from "express";
import { getAllCategories } from "../controllers/categoryController";

const categoryRoutes: IRouter = Router();

categoryRoutes.get("/", getAllCategories);

export default categoryRoutes;
