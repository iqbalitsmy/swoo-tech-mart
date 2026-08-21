import axiosInstance from './axios';

export const getWishlistRequest = async () => {
    const { data } = await axiosInstance.get("/wishlist");
    return data.data; // -> { id, items: [{ id, product: {...}, addedAt }] }
};

// Kept for single-product contexts (e.g. a product-details page checking
// status before the global list has loaded) — NOT used by ProductCard,
// since calling this per-card is the N-request problem all over again.
export const checkWishlistRequest = async (productId) => {
    const { data } = await axiosInstance.get(`/wishlist/check/${productId}`);
    return data.data; // -> boolean
};

export const addToWishlistRequest = async (productId) => {
    const { data } = await axiosInstance.post('/wishlist/items', { productId });
    return data.data; // -> { id, product: {...}, addedAt } — the ONE created item,
    // not the full wishlist. This is why useAddToWishlist can't setQueryData
    // the response directly the way useAddToCart does with cart's full-cart
    // response — see useWishlist.js.
};

export const removeFromWishlistRequest = async (productId) => {
    const { data } = await axiosInstance.delete(`/wishlist/items/${productId}`);
    return data.data; // -> {} — empty. No info to reconcile with; the
    // optimistic removal + invalidate-on-settle is doing all the real work.
};

export const clearWishlist = async () => {
    const { data } = await axiosInstance.delete("/wishlist");
    return data.data; // -> {}
};