import axiosInstance from "../axios";
import { unwrap } from "../unwrap";

export const getBrands = () => unwrap(axiosInstance.get("/brands"));

export const createAdminBrand = (payload) =>
  unwrap(axiosInstance.post("/admin/brands", payload));

export const updateAdminBrand = (id, payload) =>
  unwrap(axiosInstance.put(`/admin/brands/${id}`, payload));

export const deleteAdminBrand = (id) =>
  unwrap(axiosInstance.delete(`/admin/brands/${id}`));
