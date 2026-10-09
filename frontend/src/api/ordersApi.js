import axiosInstance from "./axios";
import { unwrap } from "./unwrap";


export const getOrder = (cleanParams) => {
    return unwrap(axiosInstance.get('/orders', { params: cleanParams }));
}

export const getOrderDetails = (orderId) => {
    return unwrap(axiosInstance.get(`orders/${orderId}`));
}

export const createOrderRequest = ({ shippingAddressId, paymentProvider }) => {
    return unwrap(axiosInstance.post('/orders', { shippingAddressId, paymentProvider }));
};

export const orderCancelRequest = (orderId) => {
    return unwrap(axiosInstance.patch(`orders/${orderId}/cancel`));
}


