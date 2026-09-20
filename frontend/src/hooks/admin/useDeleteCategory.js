import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAdminCategory } from "@/api/adminApi";

export function useDeleteCategory() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: deleteAdminCategory,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category deleted");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not delete category");
        },
    });
}