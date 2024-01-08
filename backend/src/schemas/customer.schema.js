import { z } from "zod";

export const customerSchema = z.object({
  firstName: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(4, { message: "Name must be 4 or more characters long" })
    .max(40, { message: "Name must be 40 or fewer characters long" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/, {
      message: "Name should only contain letters and spaces",
    }),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .min(4, { message: "Last name must be 4 or more characters long" })
    .max(40, { message: "Last name must be 40 or fewer characters long" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/, {
      message: "Last name should only contain letters and spaces",
    }),
  ci: z
    .string({
      required_error: "CI is required",
      invalid_type_error: "CI must be a string",
    })
    .min(5, { message: "CI must be 5 or more characters long" })
    .max(15, { message: "CI must be 15 or fewer characters long" }),
  phone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .min(5, { message: "Phone number must be 5 or more characters long" })
    .max(15, { message: "Phone number must be 15 or fewer characters long" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password should have at least 6 characters" })
    .max(20, { message: "Password should not exceed 20 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, and one number (e.g., 'Abc123')",
    }),
});
