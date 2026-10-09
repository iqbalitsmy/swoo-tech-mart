import { createAdminProduct, updateAdminProduct } from "@/api/adminApi/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { createAdminProduct, updateAdminProduct } from "@/api/adminApi";

export function useSaveProduct({ product, onCreated, onUpdated }) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (validatedProduct) =>
            product
                ? updateAdminProduct(product.id, validatedProduct)
                : createAdminProduct(validatedProduct),

        onSuccess: (created) => {
            client.invalidateQueries({ queryKey: ["products"] });
            if (!product) onCreated?.(created);
            else onUpdated?.();
            toast.success(product ? "Product updated" : "Product created");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not save product");
        },
    });
}