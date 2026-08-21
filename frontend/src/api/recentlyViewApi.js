import axiosInstance from "./axios";


export const getRecentlyViewRequest = async () => {
    const { data } = await axiosInstance.get("/recently-viewed");
    return data.data;
}

export const recordRecentlyViewRequest = async (productId) => {
    const { data } = await axiosInstance.post(`/recently-viewed/${productId}`);
    return data.data;
}
