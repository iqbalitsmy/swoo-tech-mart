import { getAttributeValues } from "@/api/adminApi/attributes";
import { useQuery } from "@tanstack/react-query";
// import { getAttributeValues } from "@/api/adminApi";

export function useAttributeValues(attributeTypeId) {
    return useQuery({
        queryKey: ["attribute-values", attributeTypeId],
        queryFn: () => getAttributeValues(attributeTypeId),
        enabled: Boolean(attributeTypeId),
    });
}