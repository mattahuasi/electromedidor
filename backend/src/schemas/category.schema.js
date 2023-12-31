import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  initialism: z.string(),
  minA: z.number(),
  maxA: z.number(),
  minB: z.number(),
  maxB: z.number(),
  minC: z.number(),
  maxC: z.number(),
  priceA: z.number(),
  priceB: z.number(),
  priceC: z.number(),
});
