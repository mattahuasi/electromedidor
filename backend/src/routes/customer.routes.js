import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { customerSchema } from "../schemas/customer.schema.js";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByIdHardware,
} from "../controllers/customer.controller.js";

const router = new Router();
router.post(
  "/customers",
  validateSchema(customerSchema),
  authRequired,
  createCustomer
);
router.get("/customers", authRequired, getCustomers);
router.get("/customers/:id", authRequired, getCustomerById);
router.put("/customers/:id", authRequired, updateCustomer);
router.delete("/customers/:id", authRequired, deleteCustomer);
router.get("/customers/:id/hardware", authRequired, getCustomerByIdHardware);

export default router;
