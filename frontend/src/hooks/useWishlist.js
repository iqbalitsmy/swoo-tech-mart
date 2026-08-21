import { addToWishlistRequest, clearWishlist, getWishlistRequest, removeFromWishlistRequest } from "@/api/wishlistApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const WISHLIST_QUERY_KEY = ["wishlist"];

export const useGetWishlist = () => {
    const { isAuthLoading, isAuthenticated } = useAuth();
    return useQuery({
        queryKey: WISHLIST_QUERY_KEY,
        queryFn: getWishlistRequest,
        enabled: !isAuthLoading && isAuthenticated,
        staleTime: 30 * 1000,
    });
};

// CHANGED: item.product.id, not item.productId — matches the real nested
// shape (`item.product.id`). Getting this wrong would make every heart icon
// report false and every card silently disagree with the actual wishlist.
export const useIsProductInWishlist = (productId) => {
    const { data } = useQuery({
        queryKey: WISHLIST_QUERY_KEY,
        queryFn: getWishlistRequest,
        enabled: false,
        select: (wishlist) =>
            wishlist?.items?.some((item) => item.product.id === productId) ?? false,
    });
    return data ?? false;
};

export const useWishlistCount = () => {
    const { data } = useQuery({
        queryKey: WISHLIST_QUERY_KEY,
        queryFn: getWishlistRequest,
        enabled: false,
        select: (wishlist) => wishlist?.items?.length ?? 0,
    });
    return data ?? 0;
};

// CHANGED: `product` is now required, not optional metadata — the optimistic
// placeholder has to build a full nested `{ product: {...} }` shape so
// useIsProductInWishlist's `item.product.id` check works on it immediately.
// Since POST's real response only comes back after the request settles, and
// we invalidate on settle anyway, the optimistic entry never needs to be
// "corrected" in place — it just gets replaced wholesale by the refetch.
export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId }) => addToWishlistRequest(productId),

        onMutate: async ({ productId, product }) => {
            await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });
            const previous = queryClient.getQueryData(WISHLIST_QUERY_KEY);

            queryClient.setQueryData(WISHLIST_QUERY_KEY, (old) => ({
                ...old,
                items: [
                    ...(old?.items ?? []),
                    {
                        id: `optimistic-${productId}`, // placeholder id, real one arrives on invalidate
                        product, // { id, title, slug, imageUrl, minPrice, maxPrice, stockStatus, isNew }
                        addedAt: new Date().toISOString(),
                    },
                ],
            }));

            return { previous };
        },

        onError: (err, variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(WISHLIST_QUERY_KEY, context.previous);
            }
            // 409 (already in wishlist) also lands here — treat as a no-op
            // rather than a scary error, since the end state the user wanted
            // (item in wishlist) is already true.
            if (err?.response?.status !== 409) {
                toast.error("Couldn't add to wishlist. Please try again.");
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
        },
    });
};

// CHANGED: filter now checks item.product.id, not item.productId.
export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId) => removeFromWishlistRequest(productId),

        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });
            const previous = queryClient.getQueryData(WISHLIST_QUERY_KEY);

            queryClient.setQueryData(WISHLIST_QUERY_KEY, (old) => ({
                ...old,
                items: (old?.items ?? []).filter((item) => item.product.id !== productId),
            }));

            return { previous };
        },

        onError: (err, productId, context) => {
            if (context?.previous) {
                queryClient.setQueryData(WISHLIST_QUERY_KEY, context.previous);
            }
            toast.error("Couldn't remove from wishlist. Please try again.");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
        },
    });
};

export const useClearWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clearWishlist,
        onSuccess: () => {
            queryClient.setQueryData(WISHLIST_QUERY_KEY, (old) => ({ ...old, items: [] }));
            // No response body to reconcile against (DELETE returns {}), and
            // "clear" is unambiguous — set-to-empty directly, invalidate isn't
            // even necessary here, but doesn't hurt as a safety net:
            queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
        },
    });
};