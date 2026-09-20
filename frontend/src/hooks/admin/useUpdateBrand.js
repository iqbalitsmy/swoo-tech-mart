import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAdminBrand } from "@/api/adminApi";

export function useUpdateBrand() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateAdminBrand(id, payload),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["brands"] });
            toast.success("Brand updated");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not update brand");
        },
    });
}