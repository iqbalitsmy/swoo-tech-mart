import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAttributeType } from "@/api/adminApi";

export function useUpdateAttributeType() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateAttributeType(id, payload),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["attribute-types"] });
            toast.success("Attribute type updated");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not update attribute type");
        },
    });
}