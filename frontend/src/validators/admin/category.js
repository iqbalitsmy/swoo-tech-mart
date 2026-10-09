import { z } from "zod";
import { slug } from "./common";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug,
  // Select values arrive as strings: "" -> null (root category), "5" -> 5
  parentCategoryId: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : null)),
});
