import axiosInstance from "./axios";
import { unwrap } from "./unwrap";


export const getCategoryListRequest = (categoryId) => {
    return unwrap(axiosInstance.get('/categories', {
        params: categoryId != null ? { parentId: categoryId } : undefined
    }));
};

export const getCategoryRequest = (categorySlug) => {
    return unwrap(axiosInstance.get(`/categories/${categorySlug}`));
};