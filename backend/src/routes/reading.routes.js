import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { getReadingsById } from "../controllers/reading.controller.js";

const router = new Router();

router.get("/hardware/:id/readings", authRequired, getReadingsById);

export default router;
