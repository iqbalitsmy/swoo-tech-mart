import { getProductFiltersRequest, getProductRequest, getProductsRequest, getRelatedProductRequest } from "@/api/productsApi";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";


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
        enabled: Boolean(slug),
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



export function useProductRecord(detailData) {
    const client = useQueryClient();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (detailData) setProduct(detailData);
    }, [detailData]);

    const reload = async () => {
        if (!product?.slug) return;
        const data = await client.fetchQuery({
            queryKey: ["product", product.slug],
            queryFn: () => getProductRequest(product.slug),
            staleTime: 0,
        });
        setProduct(data);
    };

    return { product, setProduct, reload };
}


export function useProductDetail(slug) {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => getProductRequest(slug),
        enabled: Boolean(slug),
    });
}