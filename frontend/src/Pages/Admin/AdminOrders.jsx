import { useState } from "react";
import { toast } from "sonner";

import {
  ORDER_STATUSES,
  statusClass,
} from "../../Components/Shared/Admin/adminUi";


import { orderStatusSchema } from "@/validators/adminValidator";
import PageHeader from "@/Components/Shared/Admin/PageHeader/PageHeader";
import Feedback from "@/Components/Shared/Feedback/Feedback";
import Pager from "@/Components/Shared/Pager/Pager";
import { formateMoney } from "@/utils/formateMoney";
import { formateDate } from "@/utils/formateDate";
import { useAdminOrdersQuery, useUpdateAdminOrderStatus } from "@/hooks/admin/useAdminOrders";

export default function AdminOrders() {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("");

  const query = useAdminOrdersQuery({ page, status });
  const update = useUpdateAdminOrderStatus();

  function handleFilterChange(e) {
    setStatus(e.target.value);
    setPage(0);
  }

  function handleOrderStatusChange(order, newStatus) {
    const result = orderStatusSchema.safeParse({
      id: order.id,
      status: newStatus,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    update.mutate({
      id: result.data.id,
      value: result.data.status,
    });
  }

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and update every customer order."
        action={
          <select
            value={status}
            onChange={handleFilterChange}
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

                  <td className="p-4 text-gray-500">{order.userEmail}</td>

                  <td className="p-4 text-gray-500">
                    {formateDate(order.createdAt)}
                  </td>

                  <td className="p-4 font-medium text-primary">
                    {formateMoney(order.totalAmount)}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      disabled={update.isPending}
                      onChange={(e) =>
                        handleOrderStatusChange(order, e.target.value)
                      }
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
