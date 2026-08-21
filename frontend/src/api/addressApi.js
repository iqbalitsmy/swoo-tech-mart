import axiosInstance from "./axios";


const BASE = '/address';

export const addressGetAllRequest = async () => {
    const { data } = await axiosInstance.get(BASE);
    return data.data;
}

export const addressGetByIdRequest = async (id) => {
    const { data } = await axiosInstance.get(`${BASE}/${id}`);
    return data.data;
}

export const addressCreateRequest = async (payload) => {
    const { data } = await axiosInstance.post(BASE, payload);
    return data.data;
}

export const addressUpdateRequest = async (id, payload) => {
    const { data } = await axiosInstance.put(`${BASE}/${id}`, payload);
    return data.data;
}

export const addressRemoveRequest = async (id) => {
    await axiosInstance.delete(`${BASE}/${id}`);
    return id;
}

export const setDefaultRequest = async (id) => {
    const { data } = await axiosInstance.patch(`${BASE}/${id}/default`);
    return data.data;
}