import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import {
  login,
  logout,
  verifyToken,
  updateProfile,
  updatePassword,
} from "../controllers/authEmployee.controller.js";

const router = new Router();

router.post("/auth/employees/login", validateSchema(loginSchema), login);
router.post("/auth/employees/logout", authRequired, logout);
router.get("/auth/employees/verify", verifyToken);
router.put("/auth/employees/update/profile", authRequired, updateProfile);
router.put("/auth/employees/update/password", authRequired, updatePassword);

export default router;
