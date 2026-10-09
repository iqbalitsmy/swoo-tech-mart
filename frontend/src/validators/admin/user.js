import { z } from "zod";

// Enable/disable a user account
export const userStatusSchema = z.object({
  id: z.coerce.number().int().positive(),
  enabled: z.boolean(),
});

// Assign roles to a user (at least one required)
export const userRolesSchema = z.object({
  id: z.coerce.number().int().positive(),
  roleIds: z
    .array(z.coerce.number().int().positive())
    .min(1, "Select at least one role"),
});s

// Admin users search box
export const userSearchSchema = z.object({
  search: z.string().trim().max(100, "Search is too long"),
});
