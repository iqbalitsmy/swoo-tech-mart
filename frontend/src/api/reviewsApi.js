import axiosInstance from "./axios";
import { unwrap } from "./unwrap";


export const getProductReviews = (
  productId,
  { page = 0, size = 5, sort } = {},
) => {
  const params = { page, size, ...(sort && { sort }) };
  return unwrap(
    axiosInstance.get(`/products/${productId}/reviews`, { params }),
  );
};

export const getReviewEligibility = (productId) => {
  return unwrap(axiosInstance.get(`/products/${productId}/review-eligibility`));
};

export const createReview = (productId, payload) => {
  return unwrap(axiosInstance.post(`/products/${productId}/reviews`, payload));
};

export const updateReview = (reviewId, payload) => {
  return unwrap(axiosInstance.put(`/reviews/${reviewId}`, payload));
};

export const deleteReview = (reviewId) => {
  return unwrap(axiosInstance.delete(`/reviews/${reviewId}`));
};
