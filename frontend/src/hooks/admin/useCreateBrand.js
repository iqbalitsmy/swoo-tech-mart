import { createAdminBrand } from "@/api/adminApi/brands";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { createAdminBrand } from "@/api/adminApi";

export function useCreateBrand() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: createAdminBrand,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["brands"] });
            toast.success("Brand created");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not create brand");
        },
    });
}