import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { hardwareSchema } from "../schemas/hardware.schema.js";
import { getReadings } from "../controllers/reading.controller.js";

const router = new Router();

router.get("/hardware/:id/readings", /* authRequired, */ getReadings);

export default router;
