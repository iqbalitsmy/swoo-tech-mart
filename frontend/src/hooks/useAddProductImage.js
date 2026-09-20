import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addAdminProductImage } from "@/api/adminApi";

export function useAddProductImage(productId, reload) {
    return useMutation({
        mutationFn: (data) =>
            addAdminProductImage(productId, { ...data, sortOrder: Number(data.sortOrder || 0) }),
        onSuccess: async () => {
            await reload();
            toast.success("Product image added");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not add product image");
        },
    });
}