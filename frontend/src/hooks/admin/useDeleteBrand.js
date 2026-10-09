import { deleteAdminBrand } from "@/api/adminApi/brands";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { deleteAdminBrand } from "@/api/adminApi";

export function useDeleteBrand() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: deleteAdminBrand,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["brands"] });
            toast.success("Brand deleted");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not delete brand");
        },
    });
}