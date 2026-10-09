import axiosInstance from "../axios";
import { unwrap } from "../unwrap";

export const getTags = () => unwrap(axiosInstance.get("/tags"));

export const createAdminTag = (payload) =>
    unwrap(axiosInstance.post("/admin/tags", payload));

export const updateAdminTag = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/tags/${id}`, payload));

export const deleteAdminTag = (id) =>
    unwrap(axiosInstance.delete(`/admin/tags/${id}`));
