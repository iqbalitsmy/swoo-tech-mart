import { deleteAttributeValue } from "@/api/adminApi/attributes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { deleteAttributeValue } from "@/api/adminApi";

export function useDeleteAttributeValue() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: deleteAttributeValue,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["attribute-values"] });
            toast.success("Attribute value deleted");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not delete attribute value");
        },
    });
}