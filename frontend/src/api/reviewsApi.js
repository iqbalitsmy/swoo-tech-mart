import axiosInstance from "./axios";


export const getProductReviews = async (productId, { page = 0, size = 5, sort } = {}) => {
    const params = { page, size, ...(sort && { sort }) };
    const { data } = await axiosInstance.get(`/products/${productId}/reviews`, { params });
    return data.data;
};

export const getReviewEligibility = async (productId) => {
    const { data } = await axiosInstance.get(`/products/${productId}/review-eligibility`);
    return data.data;
}

export const createReview = async (productId, payload) => {
    const { data } = await axiosInstance.post(`/products/${productId}/reviews`, payload);
    return data.data;
}

export const updateReview = async (reviewId, payload) => {
    const { data } = await axiosInstance.put(`/reviews/${reviewId}`, payload);
    return data.data;
}

export const deleteReview = async (reviewId) => {
    const { data } = await axiosInstance.delete(`/reviews/${reviewId}`);
    return data.data;
}