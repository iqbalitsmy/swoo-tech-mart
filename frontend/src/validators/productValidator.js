import { z } from "zod";

const optionalId = z.union([z.coerce.number().int().positive(), z.literal(""), z.null()]).transform((value) => value === "" ? null : value);
const order = z.coerce.number().int().min(0, "Order cannot be negative").default(0);

export const productSchema = z.object({
  sku: z.string().trim().min(1, "SKU is required").max(100),
  title: z.string().trim().min(1, "Product title is required").max(255),
  slug: z.string().trim().min(1, "URL slug is required").max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  categoryId: optionalId,
  brandId: optionalId,
  stockStatus: z.enum(["IN_STOCK", "OUT_OF_STOCK", "PRE_ORDER"]),
  isNew: z.boolean(),
  tagIds: z.array(z.coerce.number().int().positive()).default([]),
});

export const productImageSchema = z.object({ url: z.string().url("Select a valid product image"), sortOrder: order });
export const highlightSchema = z.object({ text: z.string().trim().min(1, "Highlight is required").max(500), sortOrder: order });
export const descriptionSectionSchema = z.object({ title: z.string().trim().min(1, "Section title is required").max(255), body: z.string().trim().min(1, "Description is required"), sortOrder: order });
export const variantSchema = z.object({ sku: z.string().trim().min(1, "Variant SKU is required").max(100), price: z.coerce.number().min(0, "Price cannot be negative"), stockQty: z.coerce.number().int().min(0, "Stock cannot be negative"), imageUrl: z.string().url("Select a valid variant image").nullable() });
export const descriptionImageSchema = z.object({ url: z.string().url("Select a valid description image"), altText: z.string().trim().max(255).optional(), sortOrder: order });

export const variantImageSchema = z.object({
    url: z.string().url("Select a valid image"),
    sortOrder: z.coerce.number().int().min(0).default(0),
});

