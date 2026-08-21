
import { addressCreateRequest, addressGetAllRequest, addressGetByIdRequest, addressRemoveRequest, addressUpdateRequest, setDefaultRequest } from '@/api/addressApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


// Single source of truth for the query key — avoids the double-wrap /
// mismatch bug (queryKey: [ADDRESS_KEYS.all] vs ADDRESS_KEYS.all).
export const ADDRESS_KEYS = {
    all: ['addresses'],
    detail: (id) => ['addresses', id],
};

export const useAddresses = () => {
    return useQuery({
        queryKey: ADDRESS_KEYS.all,
        queryFn: addressGetAllRequest,
    });
};

export const useAddress = (id) => {
    return useQuery({
        queryKey: ADDRESS_KEYS.detail(id),
        queryFn: () => addressGetByIdRequest(id),
        enabled: !!id,
    });
};

export const useAddAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addressCreateRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADDRESS_KEYS.all });
        },
        onError: (err) => {
            // TODO: toast — "Could not add address" (toast lib not yet decided)
            console.error(err);
        },
    });
};

export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => addressUpdateRequest(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADDRESS_KEYS.all });
        },
        onError: (err) => {
            // TODO: toast — "Could not update address"
            console.error(err);
        },
    });
};

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addressRemoveRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADDRESS_KEYS.all });
        },
        onError: (err) => {
            // TODO: toast — "Could not delete address"
            console.error(err);
        },
    });
};

export const useSetDefaultAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: setDefaultRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADDRESS_KEYS.all });
        },
        onError: (err) => {
            // TODO: toast — "Could not set default address"
            console.error(err);
        },
    });
};