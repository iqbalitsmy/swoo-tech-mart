import { addAdminDescriptionImage } from "@/api/adminApi/productContent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// import { addAdminDescriptionImage } from "@/api/adminApi";

export function useAddDescriptionImage(productId, reload) {
    return useMutation({
        mutationFn: ({ sectionId, url, altText, sortOrder }) =>
            addAdminDescriptionImage(productId, sectionId, {
                url,
                altText,
                sortOrder: Number(sortOrder || 0),
            }),
        onSuccess: async () => {
            await reload();
            toast.success("Description image added");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not add description image");
        },
    });
}