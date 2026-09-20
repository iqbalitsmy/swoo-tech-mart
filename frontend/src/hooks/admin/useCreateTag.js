import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAdminTag } from "@/api/adminApi";

export function useCreateTag() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: createAdminTag,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Tag created");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not create tag");
        },
    });
}