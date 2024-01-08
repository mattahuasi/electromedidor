import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { customerSchema } from "../schemas/customer.schema.js";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from "../controllers/customer.controller.js";

const router = new Router();
router.post("/customers", validateSchema(customerSchema), createCustomer);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.put("/customers/:id", updateCustomerById);
router.delete("/customers/:id", deleteCustomerById);
// router.get("/customers/:id/hardware", authRequired, getCustomerByIdHardware);

export default router;
