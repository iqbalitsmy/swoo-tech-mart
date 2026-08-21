import axiosInstance from "./axios";


export const getCategoryListRequest = async (categoryId) => {
    const { data } = await axiosInstance.get('/categories', {
        params: categoryId != null ? { parentId: categoryId } : undefined
    });
    return data.data;
};

export const getCategoryRequest = async (categorySlug) => {
    const { data } = await axiosInstance.get(`/categories/${categorySlug}`);
    return data.data;
};