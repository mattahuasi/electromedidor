import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  ci: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  admin: z.boolean(),
});
