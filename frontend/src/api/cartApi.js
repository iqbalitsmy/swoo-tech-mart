import axiosInstance from './axios';

export const addToCartRequest = async ({ productId, variantId, quantity }) => {
    const { data } = await axiosInstance.post('/cart/items', {
        productId,
        variantId,
        quantity,
    });
    return data.data; // CHANGED: unwrap ApiResponse envelope here — every
    // caller downstream (hooks, components) now works with the real cart
    // object { id, items, subtotal }, not { success, message, data }.
};

export const getCartRequest = async () => {
    const { data } = await axiosInstance.get('/cart');
    return data.data; // CHANGED: same unwrap
};

export const mergeCartRequest = async () => {
    const { data } = await axiosInstance.post('/cart/merge');
    return data.data; // CHANGED: same unwrap
};

export const updateCartItemQtyRequest = async ({ itemId, quantity }) => {
    const { data } = await axiosInstance.patch(`/cart/items/${itemId}`, { quantity });
    return data.data; // CHANGED: same unwrap
};

export const removeCartItemRequest = async (itemId) => {
    const { data } = await axiosInstance.delete(`/cart/items/${itemId}`);
    return data.data; // CHANGED: same unwrap
};

export const clearCartRequest = async () => {
    const { data } = await axiosInstance.delete("/cart");
    return data.data; // CHANGED: same unwrap
};