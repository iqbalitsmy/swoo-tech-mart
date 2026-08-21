import { getRecentlyViewRequest } from "@/api/recentlyViewApi";
import { useQuery } from "@tanstack/react-query";

export const orderKeys = {
    all: ['recently-viewed'],
};

export const useGetRecentlyViewProduct= () => {
    return useQuery({
        queryKey: orderKeys.all,
        queryFn: getRecentlyViewRequest,

        staleTime: 60 * 1000,
    });
}
