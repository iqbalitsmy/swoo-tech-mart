import axiosInstance from "./axios"
import { unwrap } from "./unwrap";

export const getProductFiltersRequest = async (slug) => {
    return unwrap(axiosInstance.get('/products/filters', {
        params: slug ? { slug: slug } : undefined,
    }));
};

export const getRelatedProductRequest = async (id) => {
    return unwrap(axiosInstance.get(`/products/${id}/related`));
};

export const getProductRequest = async (slug) => {
    return unwrap(axiosInstance.get(`/products/${slug}`));
};

export const getProductsRequest = async ({
    category,
    brand,
    tag,
    minPrice,
    maxPrice,
    stockStatus,
    isNew,
    sort,
    page,
    size,
    q,
}) => {
    return unwrap(axiosInstance.get('/products', {
        params: {
            categorySlug: category || undefined,
            brandSlug: brand || undefined,
            tag: tag || undefined,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            stockStatus: stockStatus || undefined,
            isNew: isNew || undefined,
            sort: sort || undefined,
            page: page || undefined,
            size: size || undefined,
            q: q || undefined,
        },
    }));
};