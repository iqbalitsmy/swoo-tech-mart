import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getAdminOrders, updateAdminOrderStatus } from "@/api/adminApi/orders";

export const ADMIN_ORDERS_QUERY_KEY = ["admin", "orders"];

const PAGE_SIZE = 15;

export function useAdminOrdersQuery({ page, status }) {
  return useQuery({
    queryKey: [...ADMIN_ORDERS_QUERY_KEY, page, status],
    queryFn: () =>
      getAdminOrders({
        page,
        size: PAGE_SIZE,
        status: status || undefined,
      }),
  });
}

export function useUpdateAdminOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, value }) => updateAdminOrderStatus(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_ORDERS_QUERY_KEY });
      toast.success("Order status updated");
    },
    onError: () => toast.error("Could not update the order"),
  });
}
