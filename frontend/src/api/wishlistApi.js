import axiosInstance from './axios';
import { unwrap } from './unwrap';

export const getWishlistRequest = async () => {
    return unwrap(axiosInstance.get("/wishlist"));
};

export const checkWishlistRequest = async (productId) => {
    return unwrap(axiosInstance.get(`/wishlist/check/${productId}`));
};

export const addToWishlistRequest = async (productId) => {
    return unwrap(axiosInstance.post('/wishlist/items', { productId }));
};

export const removeFromWishlistRequest = async (productId) => {
    return unwrap(axiosInstance.delete(`/wishlist/items/${productId}`));
};

export const clearWishlist = async () => {
    return unwrap(axiosInstance.delete("/wishlist"));
};