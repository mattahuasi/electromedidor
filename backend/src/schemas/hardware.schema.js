import { z } from "zod";

export const hardwareSchema = z.object({
  mack: z
    .string({
      required_error: "Mack is required",
      invalid_type_error: "Mack must be a string",
    })
    .min(4, { message: "Mack must be 4 or more characters long" })
    .max(40, { message: "Mack must be 40 or fewer characters long" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Mack should only contain letters and numbers without spaces",
    }),
  address: z.string({
    required_error: "Address is required",
    invalid_type_error: "Address must be a string",
  }),
  status: z.string({
    required_error: "Status is required",
    invalid_type_error: "Status must be a string",
  }),
  key: z.boolean({
    required_error: "Key is required",
    invalid_type_error: "Key must be a boolean",
  }),
  urban: z.boolean({
    required_error: "Urban is required",
    invalid_type_error: "Urban must be a boolean",
  }),
  rural: z.boolean({
    required_error: "Rural is required",
    invalid_type_error: "Rural must be a boolean",
  }),
  // customerId: z.number(),
  categoryId: z.number({
    required_error: "Category is required",
    invalid_type_error: "Category must be a number",
  }),
});
