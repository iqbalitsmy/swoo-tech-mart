import { getBrands } from "@/api/adminApi/brands";
import { useQuery } from "@tanstack/react-query";
// import { getBrands } from "@/api/adminApi";

export function useBrands() {
    return useQuery({ queryKey: ["brands"], queryFn: getBrands });
}