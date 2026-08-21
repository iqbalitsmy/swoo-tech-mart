import { createReview, deleteReview, getProductReviews, getReviewEligibility, updateReview } from "@/api/reviewsApi";
import { useAuth } from "./useAuth";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const reviewKeys = {
    product: (productId) => ["reviews", "product", productId],
    eligibility: (productId) => ["reviews", "eligibility", productId],
};

const invalidateReviews = (queryClient, productId) => {
    queryClient.invalidateQueries({ queryKey: reviewKeys.product(productId) });
    queryClient.invalidateQueries({ queryKey: reviewKeys.eligibility(productId) });
};


export const useProductReviews = (productId, { size = 5, sort = "newest" } = {}) => {
    const { isAuthenticated, isAuthLoading } = useAuth();
    return useInfiniteQuery({
        queryKey: [...reviewKeys.product(productId), { size, sort }],
        queryFn: ({ pageParam = 0 }) => getProductReviews(productId, { page: pageParam, size, sort }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.reviews.last ? undefined : lastPage.reviews.page + 1,
        enabled: !isAuthLoading && !!productId,
    });
};

export const useReviewEligibility = (productId) => {
    const { isAuthenticated, isAuthLoading } = useAuth();
    return useQuery({
        queryKey: reviewKeys.eligibility(productId),
        queryFn: () => getReviewEligibility(productId),
        enabled: !isAuthLoading && !!productId, // fetch even when logged out — backend returns NOT_AUTHENTICATED
    });
};


export const useCreateReview = (productId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => createReview(productId, payload),
        onSuccess: () => {
            invalidateReviews(queryClient, productId);
            toast.success("Review posted");
        },
        onError: (err) => toast.error(err?.response?.data?.message ?? "Couldn't post your review"),
    });
};

export const useUpdateReview = (productId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...payload }) => updateReview(id, payload),
        onSuccess: () => {
            invalidateReviews(queryClient, productId);
            toast.success("Review updated");
        },
        onError: (err) => toast.error(err?.response?.data?.message ?? "Couldn't update your review"),
    });
};

export const useDeleteReview = (productId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (reviewId) => deleteReview(reviewId),
        onSuccess: () => {
            invalidateReviews(queryClient, productId);
            toast.success("Review deleted");
        },
        onError: (err) => toast.error(err?.response?.data?.message ?? "Couldn't delete your review"),
    });
};