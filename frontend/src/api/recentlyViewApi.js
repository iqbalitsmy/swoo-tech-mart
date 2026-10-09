import axiosInstance from "./axios";
import { unwrap } from "./unwrap";


export const getRecentlyViewRequest = () => {
    return unwrap(axiosInstance.get("/recently-viewed"));
}

export const recordRecentlyViewRequest = (productId) => {
    return unwrap(axiosInstance.post(`/recently-viewed/${productId}`));
}
