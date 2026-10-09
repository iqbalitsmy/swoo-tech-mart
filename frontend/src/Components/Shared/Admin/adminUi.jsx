import { AlertCircle, Loader2 } from "lucide-react";

export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
  "REFUNDED",
];

export const statusClass = {
  PENDING: "bg-gray-100 text-gray-600",
  CONFIRMED: "bg-blue-50 text-blue-700",
  SHIPPED: "bg-indigo-50 text-indigo-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELED: "bg-red-50 text-red-600",
  REFUNDED: "bg-purple-50 text-purple-700",
};