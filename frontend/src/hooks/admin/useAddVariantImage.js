import { addAdminVariantImage } from "@/api/adminApi/variants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// import { addAdminVariantImage } from "@/api/adminApi";

export function useAddVariantImage(reload) {
    return useMutation({
        mutationFn: ({ variantId, data }) => addAdminVariantImage(variantId, data),
        onSuccess: async () => {
            await reload();
            toast.success("Variant image added");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not add variant image");
        },
    });
}