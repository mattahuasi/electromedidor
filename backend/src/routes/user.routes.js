import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { userSchema } from "../schemas/user.schema.js";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = new Router();
router.post("/users", validateSchema(userSchema), authRequired, createUser);
router.get("/users", authRequired, getUsers);
router.get("/users/:id", authRequired, getUserById);
router.put("/users/:id", authRequired, adminRequired, updateUser);
router.delete("/users/:id", authRequired, deleteUser);

export default router;
