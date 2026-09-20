import { getCategoryListRequest, getCategoryRequest } from "@/api/categoryApi";
import { useQuery } from "@tanstack/react-query";



export const useCategoryList = (categoryId) => {
    return useQuery({
        queryKey: ['categories', categoryId ?? 'root'],
        queryFn: () => getCategoryListRequest(categoryId),
        staleTime: 60 * 1000,
    });
};

export function useCategories() {
    return useQuery({
        queryKey: ["categories", "admin"],
        queryFn: () => getCategoryListRequest(),
    });
}

export const useCategory = (categorySlug) => {
    return useQuery({
        queryKey: ['categories', categorySlug ?? 'slug'],
        queryFn: () => getCategoryRequest(categorySlug),
        staleTime: 60 * 1000,
    });
};
