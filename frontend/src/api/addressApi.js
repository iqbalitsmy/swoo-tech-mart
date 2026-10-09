import axiosInstance from "./axios";
import { unwrap } from "./unwrap";

const BASE = "/addresses";

export const addressGetAllRequest = async () => {
  return unwrap(axiosInstance.get(BASE));
};

export const addressGetByIdRequest = async (id) => {
  return unwrap(axiosInstance.get(`${BASE}/${id}`));
};

export const addressCreateRequest = async (payload) => {
  return unwrap(axiosInstance.post(BASE, payload));
};

export const addressUpdateRequest = async (id, payload) => {
  return unwrap(axiosInstance.put(`${BASE}/${id}`, payload));
};

export const addressRemoveRequest = async (id) => {
  await axiosInstance.delete(`${BASE}/${id}`);
  return id;
};

export const setDefaultRequest = async (id) => {
  return unwrap(axiosInstance.patch(`${BASE}/${id}/default`));
};
