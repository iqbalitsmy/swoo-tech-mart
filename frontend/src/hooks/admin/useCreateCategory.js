import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAdminCategory } from "@/api/adminApi";

export function useCreateCategory() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: createAdminCategory,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category created");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not create category");
        },
    });
}