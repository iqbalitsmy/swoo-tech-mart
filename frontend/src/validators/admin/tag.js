import { z } from "zod";

export const tagSchema = z.object({
  label: z.string().trim().min(1, "Tag label is required").max(100),
});
