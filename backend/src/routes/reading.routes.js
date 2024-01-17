import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import {
  getReadings,
  deleteReadings,
} from "../controllers/reading.controller.js";

const router = new Router();

router.get("/hardware/:id/readings", authRequired, getReadings);
router.delete(
  "/hardware/:id/readings",
  authRequired,
  adminRequired,
  deleteReadings
);

export default router;
