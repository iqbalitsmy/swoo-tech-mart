import { z } from "zod";

// Shared by category and brand: lowercase words joined by single hyphens
export const slug = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(180)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and hyphens only",
  );
