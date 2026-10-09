import axiosInstance from "../axios";
import { unwrap } from "../unwrap";

export const createAdminProduct = (payload) =>
    unwrap(axiosInstance.post("/admin/products", payload));

export const updateAdminProduct = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/products/${id}`, payload));

export const deleteAdminProduct = (id) =>
    unwrap(axiosInstance.delete(`/admin/products/${id}`));

// images
export const addAdminProductImage = (id, payload) =>
    unwrap(axiosInstance.post(`/admin/products/${id}/images`, payload));

export const deleteAdminProductImage = (id, imageId) =>
    unwrap(axiosInstance.delete(`/admin/products/${id}/images/${imageId}`));
