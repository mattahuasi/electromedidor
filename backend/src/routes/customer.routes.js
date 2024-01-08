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
  getCustomerHardwareById,
} from "../controllers/customer.controller.js";

const router = new Router();
router.post(
  "/customers",
  authRequired,
  validateSchema(customerSchema),
  createCustomer
);
router.get("/customers", authRequired, getCustomers);
router.get("/customers/:id", authRequired, getCustomerById);
router.put("/customers/:id", authRequired, updateCustomerById);
router.delete(
  "/customers/:id",
  authRequired,
  adminRequired,
  deleteCustomerById
);
router.get("/customers/:id/hardware", authRequired, getCustomerHardwareById);

export default router;
