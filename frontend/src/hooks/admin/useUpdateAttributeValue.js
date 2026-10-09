import { updateAttributeValue } from "@/api/adminApi/attributes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { updateAttributeValue } from "@/api/adminApi";

export function useUpdateAttributeValue() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateAttributeValue(id, payload),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["attribute-values"] });
            toast.success("Attribute value updated");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not update attribute value");
        },
    });
}