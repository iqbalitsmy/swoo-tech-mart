import { z } from "zod";

export const attributeTypeSchema = z.object({
  name: z.string().trim().min(1, "Attribute type is required").max(100),
});

export const attributeValueSchema = z.object({
  label: z.string().trim().min(1, "Value label is required").max(100),
  value: z.string().trim().min(1, "Value is required").max(100),
});

// Accepts #RGB or #RRGGBB (same rule ColorField uses for the picker)
export const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const hexColorSchema = z
  .string()
  .trim()
  .min(1, "Color is required")
  .regex(HEX_COLOR_REGEX, "Enter a valid hex color (e.g. #FF5733)");

// Used when the attribute type is "Color": value must be a hex color
export const colorAttributeValueSchema = z.object({
  label: z.string().trim().min(1, "Label is required"),
  value: hexColorSchema,
});
