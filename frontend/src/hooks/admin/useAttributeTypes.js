import { getAttributeTypes } from "@/api/adminApi/attributes";
import { useQuery } from "@tanstack/react-query";

export function useAttributeTypes() {
    return useQuery({ queryKey: ["attribute-types"], queryFn: getAttributeTypes });
}