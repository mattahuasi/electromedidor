import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { billSchema } from "../schemas/bill.schema.js";
import {
  createBill,
  getBills,
  getBillById,
  updateBillById,
  deleteBillById,
} from "../controllers/bill.controller.js";

const router = new Router();
router.post("/bills", authRequired, validateSchema(billSchema), createBill);
router.get("/bills", authRequired, getBills);
router.get("/bills/:id", authRequired, getBillById);
router.put("/bills/:id", authRequired, adminRequired, updateBillById);
router.delete("/bills/:id", authRequired, adminRequired, deleteBillById);

export default router;
