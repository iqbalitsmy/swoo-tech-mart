import axiosInstance from "./axios";

export const initiatePaymentRequest = async (orderId) => {
    console.log("Payment create")
    const { data } = await axiosInstance.post(`/payments/${orderId}/initiate`);
    return data.data; // { paymentId, orderId, provider, status, amount, clientSecret, redirectUrl }
};