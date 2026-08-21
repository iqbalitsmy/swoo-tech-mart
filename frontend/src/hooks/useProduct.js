import { getProductFiltersRequest, getProductRequest, getProductsRequest, getRelatedProductRequest } from "@/api/productsApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const useProductFilters = (slug) => {
    return useQuery({
        queryKey: ['product-filters', slug ?? 'root'],
        queryFn: () => getProductFiltersRequest(slug),
        staleTime: 60 * 1000,
    });
};

export const useGetProduct = (slug) => {
    return useQuery({
        queryKey: ['products', slug],
        queryFn: () => getProductRequest(slug),

        staleTime: 60 * 1000,
    },
    );
}

export const useGetRelatedProduct = (id) => {
    return useQuery({
        queryKey: ['related-products', id],
        queryFn: () => getRelatedProductRequest(id),
        enabled: !!id,
        staleTime: 60 * 1000,
    });
}


export const useGetProducts = (
    category, brand, tag, minPrice, maxPrice, stockStatus, isNew, sort, page, size, q
) => {
    return useQuery({
        queryKey: [
            'products',
            { category, brand, tag, minPrice, maxPrice, stockStatus, isNew, sort, page, size, q },
        ],
        queryFn: () =>
            getProductsRequest({
                category, brand, tag, minPrice, maxPrice, stockStatus, isNew, sort, page, size, q,
            }),
        // Keeps the previous page's products on screen (instead of a loading
        // flash) while the next page/filter combination is being fetched.
        placeholderData: keepPreviousData,
    });
};
