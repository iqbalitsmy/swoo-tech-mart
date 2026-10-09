import { deleteAttributeType } from "@/api/adminApi/attributes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { deleteAttributeType } from "@/api/adminApi";

export function useDeleteAttributeType() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: deleteAttributeType,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["attribute-types"] });
            toast.success("Attribute type deleted");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not delete attribute type");
        },
    });
}