import axiosInstance from "../axios";
import { unwrap } from "../unwrap";

export const createAdminCategory = (payload) =>
    unwrap(axiosInstance.post("/admin/categories", payload));

export const updateAdminCategory = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/categories/${id}`, payload));

export const deleteAdminCategory = (id) =>
    unwrap(axiosInstance.delete(`/admin/categories/${id}`));
