import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { hardwareSchema } from "../schemas/hardware.schema.js";
import {
  getHardware,
  getHardwares,
  createHardware,
  updateHardware,
  deleteHardware,
} from "../controllers/hardware.controller.js";

const router = new Router();
router.post("/hardware", validateSchema(hardwareSchema), createHardware);
router.get("/hardware", getHardwares);
router.get("/hardware/:id", getHardware);
router.put("/hardware/:id", updateHardware);
router.delete("/hardware/:id", deleteHardware);

export default router;
