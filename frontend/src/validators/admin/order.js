import { z } from "zod";

export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
  "REFUNDED",
];

export const orderStatusSchema = z.object({
  id: z.coerce.number().int().positive(),
  status: z.enum(ORDER_STATUSES),
});
