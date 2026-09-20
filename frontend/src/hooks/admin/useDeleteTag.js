import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAdminTag } from "@/api/adminApi";

export function useDeleteTag() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: deleteAdminTag,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Tag deleted");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not delete tag");
        },
    });
}