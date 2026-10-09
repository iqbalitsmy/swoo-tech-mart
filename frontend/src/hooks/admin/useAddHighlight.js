// import { addAdminHighlight } from "@/api/adminApi/productContent";
import { addAdminHighlight } from "@/api/adminApi/productContent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// import { addAdminHighlight } from "@/api/adminApi";

export function useAddHighlight(productId, reload) {
    return useMutation({
        mutationFn: (data) =>
            addAdminHighlight(productId, { ...data, sortOrder: Number(data.sortOrder || 0) }),
        onSuccess: async () => {
            await reload();
            toast.success("Highlight added");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not add highlight");
        },
    });
}