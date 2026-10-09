import { deleteAdminProduct } from "@/api/adminApi/products";
import { getProductsRequest } from "@/api/productsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const PRODUCTS_QUERY_KEY = ["products"];
export const ADMIN_PRODUCTS_QUERY_KEY = [...PRODUCTS_QUERY_KEY, "admin"];

const PAGE_SIZE = 15;

export function useAdminProductsQuery({ page, q }) {
  return useQuery({
    queryKey: [...ADMIN_PRODUCTS_QUERY_KEY, page, q],
    queryFn: () =>
      getProductsRequest({
        page,
        size: PAGE_SIZE,
        q: q || undefined,
      }),
  });
}

export function useDeleteAdminProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Could not delete product"),
  });
}
