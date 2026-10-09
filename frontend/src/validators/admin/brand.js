import { z } from "zod";
import { slug } from "./common";

export const brandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug,
  logoUrl: z.string().url("Select a valid image").optional().nullable(),
});
