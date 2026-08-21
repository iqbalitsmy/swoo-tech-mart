import axiosInstance from "./axios"

export const getProductFiltersRequest = async (slug) => {
    const { data } = await axiosInstance.get('/products/filters', {
        params: slug ? { slug: slug } : undefined,
    });
    return data.data;
};

export const getRelatedProductRequest = async (id) => {
    const { data } = await axiosInstance.get(`/products/${id}/related`);
    return data.data;
};

export const getProductRequest = async (slug) => {
    const { data } = await axiosInstance.get(`/products/${slug}`);
    return data.data;
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
    const { data } = await axiosInstance.get('/products', {
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
    });
    return data.data;
};