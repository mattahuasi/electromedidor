import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { hardwareSchema } from "../schemas/hardware.schema.js";
import {
  createHardware,
  getHardware,
  getHardwareById,
  updateHardwareById,
  deleteHardwareById,
} from "../controllers/hardware.controller.js";

const router = new Router();
router.post(
  "/hardware",
  authRequired,
  validateSchema(hardwareSchema),
  createHardware
);
router.get("/hardware", authRequired, getHardware);
router.get("/hardware/:id", authRequired, getHardwareById);
router.put("/hardware/:id", authRequired, updateHardwareById);
router.delete("/hardware/:id", authRequired, adminRequired, deleteHardwareById);

export default router;
