import { addToCartRequest, clearCartRequest, getCartRequest, removeCartItemRequest, updateCartItemQtyRequest } from '@/api/cartApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export const CART_QUERY_KEY = ["cart"];

export const useGetCart = () => {
    const { isAuthenticated, isAuthLoading } = useAuth();
    return useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: getCartRequest,
        enabled: !isAuthLoading && isAuthenticated,
        staleTime: 60 * 1000,
    });
}

const useCartMutation = (mutationFn) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            queryClient.setQueryData(CART_QUERY_KEY, data);
        },
    });
};

export const useAddToCart = () => useCartMutation(addToCartRequest);
export const useUpdateCartItemQty = () => useCartMutation(updateCartItemQtyRequest);
export const useRemoveCartItem = () => useCartMutation(removeCartItemRequest);
export const useClearCart = () => useCartMutation(clearCartRequest);

export const useCartItemCount = () => {
    const { data } = useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: getCartRequest,
        enabled: false,
        select: (cart) => cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    });
    return data ?? 0;
};

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
    return data;
};