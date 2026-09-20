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

export const money = (value) =>
  `৳ ${Number(value || 0).toLocaleString("en-US")}`;

export const date = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "—";

export function PageHeader({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}

export function Feedback({ loading, error, empty, children }) {
  if (loading) {
    return (
      <div className="flex justify-center py-16 text-sm text-gray-400">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        <AlertCircle className="h-4 w-4 shrink-0" />
        {error?.response?.data?.message ||
          "Something went wrong. Please try again."}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-md border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
        Nothing to show yet.
      </div>
    );
  }

  return children;
}

export function Pager({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-end gap-3 text-sm text-gray-500">
      <button
        className="rounded border px-3 py-1 disabled:opacity-40"
        disabled={!page}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </button>

      <span>
        {page + 1} / {totalPages}
      </span>

      <button
        className="rounded border px-3 py-1 disabled:opacity-40"
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}