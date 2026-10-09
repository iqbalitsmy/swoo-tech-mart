import { addAdminDescription } from "@/api/adminApi/productContent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// import { addAdminDescription } from "@/api/adminApi";

export function useAddDescriptionSection(productId, reload) {
    return useMutation({
        mutationFn: (data) =>
            addAdminDescription(productId, { ...data, sortOrder: Number(data.sortOrder || 0) }),
        onSuccess: async () => {
            await reload();
            toast.success("Description section added");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not add description");
        },
    });
}