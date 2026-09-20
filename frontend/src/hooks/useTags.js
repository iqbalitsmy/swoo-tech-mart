import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/api/adminApi";

export function useTags() {
    return useQuery({ queryKey: ["tags"], queryFn: getTags });
}