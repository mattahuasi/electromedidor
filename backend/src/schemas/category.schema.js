import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(4, { message: "Name must be 4 or more characters long" })
    .max(40, { message: "Name must be 40 or fewer characters long" })
    .regex(/^[a-zA-Z ]+$/, {
      message: "Name should only contain letters and spaces",
    }),
  initialism: z
    .string({
      required_error: "Initialism is required",
      invalid_type_error: "Initialism must be a string",
    })
    .min(4, { message: "Initialism must be 4 or more characters long" })
    .max(40, { message: "Initialism must be 40 or fewer characters long" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        "Initialism should only contain letters and numbers without spaces",
    }),
  minA: z
    .number({
      required_error: "Min A is required",
      invalid_type_error: "Min A must be a number",
    })
    .int({ message: "Min A must be an integer" }),
  maxA: z
    .number({
      required_error: "Max A is required",
      invalid_type_error: "Max A must be a number",
    })
    .int({ message: "Max A must be an integer" }),
  priceA: z
    .number({
      required_error: "Price A is required",
      invalid_type_error: "Price A must be a number",
    })
    .positive({ message: "Price A must be positive" }),
  minB: z
    .number({
      required_error: "Min B is required",
      invalid_type_error: "Min B must be a number",
    })
    .int({ message: "Min B must be an integer" }),
  maxB: z
    .number({
      required_error: "Max B is required",
      invalid_type_error: "Max B must be a number",
    })
    .int({ message: "Max B must be an integer" }),
  priceB: z
    .number({
      required_error: "Price B is required",
      invalid_type_error: "Price B must be a number",
    })
    .positive({ message: "Price B must be positive" }),
  minC: z
    .number({
      required_error: "Min C is required",
      invalid_type_error: "Min C must be a number",
    })
    .int({ message: "Min C must be an integer" }),
  maxC: z
    .number({
      required_error: "Max C is required",
      invalid_type_error: "Max C must be a number",
    })
    .int({ message: "Max C must be an integer" }),
  priceC: z
    .number({
      required_error: "Price C is required",
      invalid_type_error: "Price C must be a number",
    })
    .positive({ message: "Price C must be positive" }),
});
