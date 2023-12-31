import { z } from "zod";

export const reportSchema = z.object({
  title: z.string(),
  detail: z.string(),
  content: z.string(),
  type: z.string(),
  begin: z.date(),
  end: z.date(),
});
