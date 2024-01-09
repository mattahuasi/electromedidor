import { z } from "zod";

export const billSchema = z.object({
  consumption: z.number({
    required_error: "Consumption is required",
    invalid_type_error: "Consumption must be a number",
  }),
  cost: z.number({
    required_error: "Cost is required",
    invalid_type_error: "Cost must be a number",
  }),
  status: z.boolean({
    required_error: "Status is required",
    invalid_type_error: "Status must be a boolean",
  }),
  customerId: z.number({
    required_error: "Customer is required",
    invalid_type_error: "Customer must be a number",
  }),
  hardwareId: z.number({
    required_error: "Hardware is required",
    invalid_type_error: "Hardware must be a number",
  }),
});
