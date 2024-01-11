import { z } from "zod";

export const hardwareSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(4, { message: "Name must be 4 or more characters long" })
    .max(40, { message: "Name must be 40 or fewer characters long" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Name should only contain letters and numbers without spaces",
    }),
  address: z.string({
    required_error: "Address is required",
    invalid_type_error: "Address must be a string",
  }),
  key: z.boolean({
    required_error: "Key is required",
    invalid_type_error: "Key must be a boolean",
  }),
  area: z.boolean({
    required_error: "Area is required",
    invalid_type_error: "Area must be a boolean",
  }),
  customerId: z.number({
    required_error: "Customer is required",
    invalid_type_error: "Customer must be a number",
  }),
});
