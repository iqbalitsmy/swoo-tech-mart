import axiosInstance from "./axios";


export const getOrder = async (cleanParams) => {
    const { data } = await axiosInstance.get('/orders', { params: cleanParams });
    return data.data;
}

export const getOrderDetails = async (orderId) => {
    const { data } = await axiosInstance.get(`orders/${orderId}`);
    return data.data;
}

export const createOrderRequest = async ({ shippingAddressId, paymentProvider }) => {
    const { data } = await axiosInstance.post('/orders', { shippingAddressId, paymentProvider });
    return data.data; // { order, payment }
};

export const orderCancelRequest = async (orderId) => {
    const { data } = await axiosInstance.patch(`orders/${orderId}/cancel`);
    return data.data;
}


