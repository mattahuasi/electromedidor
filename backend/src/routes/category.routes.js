import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { categorySchema } from "../schemas/category.schema.js";
import {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = new Router();
router.post("/category", validateSchema(categorySchema), createCategory);
router.get("/category", getCategories);
router.get("/category/:id", getCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;
