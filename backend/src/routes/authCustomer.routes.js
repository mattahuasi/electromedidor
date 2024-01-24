import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { login, verifyToken } from "../controllers/authCustomer.controller.js";

const router = new Router();

router.post("/customers/login", validateSchema(loginSchema), login);
router.get("/customers/verify", verifyToken);

export default router;
