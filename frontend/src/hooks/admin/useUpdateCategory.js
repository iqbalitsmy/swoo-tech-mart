import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAdminCategory } from "@/api/adminApi";

export function useUpdateCategory() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateAdminCategory(id, payload),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category updated");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not update category");
        },
    });
}