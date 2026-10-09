import axiosInstance from "./axios";
import { unwrap } from "./unwrap";

export const initiatePaymentRequest = (orderId) => {

  return unwrap(axiosInstance.post(`/payments/${orderId}/initiate`));
  // { paymentId, orderId, provider, status, amount, clientSecret, redirectUrl }
};
