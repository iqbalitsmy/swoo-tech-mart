import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAdminTag } from "@/api/adminApi";

export function useUpdateTag() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateAdminTag(id, payload),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Tag updated");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not update tag");
        },
    });
}