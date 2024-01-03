import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import {
  login,
  logout,
  profile,
  updateProfile,
  verifyToken,
  updatePassword,
} from "../controllers/auth.controller.js";

const router = new Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authRequired, logout);
router.put("/update/password", authRequired, updatePassword);
router.get("/profile", authRequired, profile);
router.put("/profile", authRequired, updateProfile);
router.get("/verify", verifyToken);

export default router;
