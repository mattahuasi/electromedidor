import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { categorySchema } from "../schemas/category.schema.js";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = new Router();
router.post(
  "/categories",
  validateSchema(categorySchema),
  authRequired,
  createCategory
);
router.get("/categories", authRequired, getCategories);
router.get("/categories/:id", authRequired, getCategoryById);
router.put("/categories/:id", authRequired, updateCategory);
router.delete("/categories/:id", authRequired, deleteCategory);

export default router;
