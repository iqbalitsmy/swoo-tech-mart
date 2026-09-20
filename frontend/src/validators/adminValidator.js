import { z } from "zod";

export const ORDER_STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELED", "REFUNDED"];
const slug = z.string().trim().min(1, "Slug is required").max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only");

// export const categorySchema = z.object({
//   name: z.string().trim().min(1, "Category name is required").max(150),
//   slug,
//   parentCategoryId: z.number().int().positive().nullable().optional(),
// });

// export const brandSchema = z.object({
//   name: z.string().trim().min(1, "Brand name is required").max(150),
//   slug,
//   logoUrl: z.string().trim().url("Enter a valid logo URL").max(500).optional().or(z.literal("")),
// });

export const tagSchema = z.object({ label: z.string().trim().min(1, "Tag label is required").max(100) });
export const attributeTypeSchema = z.object({ name: z.string().trim().min(1, "Attribute type is required").max(100) });
export const attributeValueSchema = z.object({ label: z.string().trim().min(1, "Value label is required").max(100), value: z.string().trim().min(1, "Value is required").max(100) });
export const userStatusSchema = z.object({ id: z.coerce.number().int().positive(), enabled: z.boolean() });
export const userRolesSchema = z.object({ id: z.coerce.number().int().positive(), roleIds: z.array(z.coerce.number().int().positive()).min(1, "Select at least one role") });
export const orderStatusSchema = z.object({ id: z.coerce.number().int().positive(), status: z.enum(ORDER_STATUSES) });
export const userSearchSchema = z.object({ search: z.string().trim().max(100, "Search is too long") });


export const categorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug,
    parentCategoryId: z
        .string()
        .optional()
        .transform((v) => (v ? Number(v) : null)),
});

// brandSchema — confirm logoUrl is already shaped like this:
export const brandSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug,
    logoUrl: z.string().url("Select a valid image").optional().nullable(),
});