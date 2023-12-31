import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { userSchema } from "../schemas/user.schema.js";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = new Router();
router.post("/user", validateSchema(userSchema), createUser);
router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
