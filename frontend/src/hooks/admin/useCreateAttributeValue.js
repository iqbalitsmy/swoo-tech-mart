import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAttributeValue } from "@/api/adminApi";

export function useCreateAttributeValue() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ typeId, payload }) => createAttributeValue(typeId, payload),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["attribute-values"] });
            toast.success("Attribute value created");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not create attribute value");
        },
    });
}