import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAttributeType } from "@/api/adminApi";

export function useCreateAttributeType() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: createAttributeType,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["attribute-types"] });
            toast.success("Attribute type created");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Could not create attribute type");
        },
    });
}