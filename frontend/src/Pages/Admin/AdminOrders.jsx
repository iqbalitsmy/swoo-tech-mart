import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import {
  getAdminOrders,
  updateAdminOrderStatus,
} from "@/api/adminApi";
import {
  Feedback,
  ORDER_STATUSES,
  PageHeader,
  Pager,
  date,
  money,
  statusClass,
} from "./adminUi";
import { orderStatusSchema } from "@/validators/adminValidator";

export default function AdminOrders() {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("");
  const client = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "orders", page, status],
    queryFn: () =>
      getAdminOrders({
        page,
        size: 15,
        status: status || undefined,
      }),
  });

  const update = useMutation({
    mutationFn: ({ id, value }) =>
      updateAdminOrderStatus(id, value),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["admin", "orders"],
      });

      toast.success("Order status updated");
    },
    onError: () => toast.error("Could not update the order"),
  });

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and update every customer order."
        action={
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>

            {ORDER_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        }
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <Feedback
          loading={query.isLoading}
          error={query.error}
          empty={!query.data?.content?.length}
        >
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {query.data?.content?.map((order) => (
                <tr key={order.id}>
                  <td className="p-4 font-semibold text-gray-800">
                    {order.orderNumber}
                  </td>

                  <td className="p-4 text-gray-500">
                    {order.userEmail}
                  </td>

                  <td className="p-4 text-gray-500">
                    {date(order.createdAt)}
                  </td>

                  <td className="p-4 font-medium text-primary">
                    {money(order.totalAmount)}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      disabled={update.isPending}
                      onChange={(e) => {
                        const result = orderStatusSchema.safeParse({ id: order.id, status: e.target.value });
                        if (!result.success) return toast.error(result.error.issues[0].message);
                        update.mutate({ id: result.data.id, value: result.data.status });
                      }}
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold ${statusClass[order.status]}`}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Feedback>
      </div>

      <Pager
        page={page}
        totalPages={query.data?.totalPages ?? 0}
        onChange={setPage}
      />
    </div>
  );
}
