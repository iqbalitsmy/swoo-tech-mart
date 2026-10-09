import { deleteAdminProductImage } from "@/api/adminApi/products";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useAdminDeleteProductImage(productId, reload) {
    // The mutation receives only the imageId; productId comes from the hook argument
    const mutationFn = (imageId) => deleteAdminProductImage(productId, imageId);

    const handleSuccess = () => {
        toast.success("Image deleted");
        reload?.(); // refresh the product so the gallery updates
    };

    const handleError = (error) => {
        toast.error(error?.message || "Failed to delete image");
    };

    return useMutation({
        mutationFn,
        onSuccess: handleSuccess,
        onError: handleError,
    });
}