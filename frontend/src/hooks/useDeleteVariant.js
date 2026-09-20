import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAdminVariant } from "@/api/adminApi";

export function useDeleteVariant(reload) {
    return useMutation({
        mutationFn: (variantId) => deleteAdminVariant(variantId),
        onSuccess: async () => {
            toast.success("Variant deleted");
            await reload();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not delete variant");
        },
    });
}