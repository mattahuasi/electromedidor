import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { customerSchema } from "../schemas/customer.schema.js";
import {
  getCustomer,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = new Router();
router.post("/customer", validateSchema(customerSchema), createCustomer);
router.get("/customer", getCustomers);
router.get("/customer/:id", getCustomer);
router.put("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);

export default router;
