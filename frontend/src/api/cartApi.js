import axiosInstance from './axios';
import { unwrap } from './unwrap';

export const addToCartRequest = async ({ productId, variantId, quantity }) => {
    return unwrap(axiosInstance.post('/cart/items', {
        productId,
        variantId,
        quantity,
    }));
};

export const getCartRequest = async () => {
    return unwrap(axiosInstance.get('/cart'));
};

export const mergeCartRequest = async () => {
    return unwrap(axiosInstance.post('/cart/merge'));
};

export const updateCartItemQtyRequest = async ({ itemId, quantity }) => {
    return unwrap(axiosInstance.patch(`/cart/items/${itemId}`, { quantity }));
};

export const removeCartItemRequest = async (itemId) => {
    return unwrap(axiosInstance.delete(`/cart/items/${itemId}`));
};

export const clearCartRequest = async () => {
    return unwrap(axiosInstance.delete("/cart"));
};