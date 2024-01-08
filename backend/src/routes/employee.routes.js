import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { employeeSchema } from "../schemas/employee.schema.js";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} from "../controllers/employee.controller.js";

const router = new Router();
router.post(
  "/employees",
  authRequired,
  validateSchema(employeeSchema),
  createEmployee
);
router.get("/employees", authRequired, getEmployees);
router.get("/employees/:id", authRequired, getEmployeeById);
router.put("/employees/:id", authRequired, updateEmployeeById);
router.delete(
  "/employees/:id",
  authRequired,
  adminRequired,
  deleteEmployeeById
);

export default router;
