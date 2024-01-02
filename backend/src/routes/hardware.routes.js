import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { hardwareSchema } from "../schemas/hardware.schema.js";
import {
  getHardware,
  getHardwareById,
  createHardware,
  updateHardware,
  deleteHardware,
} from "../controllers/hardware.controller.js";

const router = new Router();
router.post("/hardware", validateSchema(hardwareSchema), createHardware);
router.get("/hardware", getHardware);
router.get("/hardware/:id", getHardwareById);
router.put("/hardware/:id", updateHardware);
router.delete("/hardware/:id", deleteHardware);

export default router;
