import { addToCartRequest, clearCartRequest, getCartRequest, removeCartItemRequest, updateCartItemQtyRequest } from '@/api/cartApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export const CART_QUERY_KEY = ["cart"];

// The single "owner" query — this is the only hook in the whole app that
// actually triggers a GET /cart. Call it once, high in the tree (NavLink,
// since it's always mounted and needs the cart anyway for the badge).
// Every other hook below only *reads* this same cache entry.
export const useGetCart = () => {
    const { isAuthenticated, isAuthLoading } = useAuth();
    return useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: getCartRequest,
        // CHANGED: added `&& isAuthenticated` — matches your auth-gating
        // principle. Without this, a guest still fires GET /cart, gets a
        // 401, and useQuery retries it in the background (extra calls,
        // console noise, and possibly a forced-logout loop if your 401
        // interceptor dispatches auth:logout on every failed request).
        enabled: !isAuthLoading && isAuthenticated,
        staleTime: 60 * 1000,
    });
}

// CHANGED: useAddToCart rewritten to reuse the same setQueryData pattern as
// every other cart mutation instead of invalidateQueries. The POST /cart/items
// response already contains the full updated cart (per your envelope spec:
// data: { id, items, subtotal }), so invalidating and re-fetching was a
// redundant second network call for information we already had in hand.
const useCartMutation = (mutationFn) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            queryClient.setQueryData(CART_QUERY_KEY, data);
        },
        // TODO: onError toast (Sonner) — consistent with your other mutation
        // hooks; not wired yet pending your app-wide Sonner rollout.
    });
};

export const useAddToCart = () => useCartMutation(addToCartRequest);
export const useUpdateCartItemQty = () => useCartMutation(updateCartItemQtyRequest);
export const useRemoveCartItem = () => useCartMutation(removeCartItemRequest);
export const useClearCart = () => useCartMutation(clearCartRequest);

// --- Derived selectors below: NONE of these fetch anything. `enabled: false`
// means React Query never issues a network request for them — they only
// read whatever useGetCart() has already put in the cache. This is what lets
// 50 ProductCards + a NavLink badge all reflect live cart state from a
// single GET /cart call.

// CHANGED: new hook — cart badge count. Sums quantities (not line-item
// count), matching the "2 items, but 5 units" convention most storefronts
// use for the badge number. Swap to `cart.items.length` if you'd rather
// badge = distinct products.
export const useCartItemCount = () => {
    const { data } = useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: getCartRequest,
        enabled: false,
        select: (cart) => cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    });
    return data ?? 0;
};

// CHANGED: new hook — per-card "is this variant already in my cart" check.
// Cart items carry both productId and variantId, so membership must be
// checked on the variant, not just the product (two different variants of
// the same product are two different cart lines).
export const useIsProductInCart = (productId, variantId) => {
    const { data } = useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: getCartRequest,
        enabled: false,
        select: (cart) =>
            cart?.items?.find(
                (item) => item.productId === productId && item.variantId === variantId
            ),
    });
    return data; // returns the matching cart item (or undefined) — useful
    // for reading its `id` (needed by useUpdateCartItemQty/useRemoveCartItem)
    // as well as just checking truthiness for the icon state.
};