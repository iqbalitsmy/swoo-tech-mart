import axiosInstance from "../axios";
import { unwrap } from "../unwrap"; 

export const createAdminVariant = (productId, payload) =>
    unwrap(axiosInstance.post(`/admin/products/${productId}/variants`, payload));

export const updateAdminVariant = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/variants/${id}`, payload));

export const deleteAdminVariant = (id) =>
    unwrap(axiosInstance.delete(`/admin/variants/${id}`));

export const addAdminVariantImage = (variantId, payload) =>
    unwrap(axiosInstance.post(`/admin/variants/${variantId}/images`, payload));
