import { z } from "zod";

export const hardwareSchema = z.object({
  mack: z.string(),
  address: z.string(),
  status: z.string(),
  key: z.boolean(),
  urban: z.boolean(),
  rural: z.boolean(),
});
