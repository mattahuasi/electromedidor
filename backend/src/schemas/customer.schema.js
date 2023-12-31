import { z } from "zod";

export const customerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  ci: z.string(),
  email: z.string(),
  phone: z.string(),
});
