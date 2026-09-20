import { useQuery } from "@tanstack/react-query";
import { getAttributeTypes } from "@/api/adminApi";

export function useAttributeTypes() {
    return useQuery({ queryKey: ["attribute-types"], queryFn: getAttributeTypes });
}