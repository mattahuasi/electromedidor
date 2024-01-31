import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import {
  register,
  login,
  logout,
  verifyToken,
  updateProfile,
  updatePassword,
} from "../controllers/authCustomer.controller.js";

const router = new Router();

router.post(
  "/auth/customers/register",
  validateSchema(registerSchema),
  register
);
router.post("/auth/customers/login", validateSchema(loginSchema), login);
router.post("/auth/customers/logout", authRequired, logout);
router.get("/auth/customers/verify", verifyToken);
router.put("/auth/customers/update/profile", authRequired, updateProfile);
router.put("/auth/customers/update/password", authRequired, updatePassword);

export default router;
