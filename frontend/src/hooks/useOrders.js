import { createOrderRequest, getOrder, getOrderDetails, orderCancelRequest } from '@/api/ordersApi';
import { initiatePaymentRequest } from '@/api/paymentsApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export const orderKeys = {
    all: ['orders'],
    list: (params) => [...orderKeys.all, 'list', params],
    detail: (id) => ['orders', 'detail', id],
};

export function useOrders({ page = 0, size = 10, status } = {}) {
    const params = { page, size, status };

    return useQuery({
        queryKey: orderKeys.list(params),
        queryFn: () => getOrder(params),
        keepPreviousData: true,
    });
}

export function useOrderDetails(orderId) {
    return useQuery({
        queryKey: orderKeys.detail(orderId),
        queryFn: () => getOrderDetails(orderId),
        enabled: !!orderId,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrderRequest,
        onSuccess: () => {
            // Order creation clears the cart server-side — drop the cached
            // cart so NavLink's badge/list refetch instead of showing stale
            // items. Swap 'cart' for your actual CART_KEYS.all constant.
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: orderKeys.all });
        },
    });
}

export function useCancelOrder(orderId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => orderCancelRequest(orderId),
        onSuccess: (updatedOrder) => {
            queryClient.setQueryData(orderKeys.detail(orderId), updatedOrder);
            queryClient.invalidateQueries({ queryKey: orderKeys.all });
        },
    });
}

// Used for retrying payment on an order whose first PaymentIntent failed —
// gets a fresh clientSecret without re-placing the order (stock is already
// decremented, cart already cleared).
export function useInitiatePayment() {
    return useMutation({
        mutationFn: initiatePaymentRequest,
    });
}