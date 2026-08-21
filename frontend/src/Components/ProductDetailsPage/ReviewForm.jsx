import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import StarRating from "../Shared/StarRating/StarRating";
import { Controller, useForm } from "react-hook-form";
import { reviewSchema } from "@/validators/reviewValidator";
import { useCreateReview, useUpdateReview } from "@/hooks/useReviews";

const ELIGIBILITY_MESSAGES = {
    NOT_AUTHENTICATED: "Log in to write a review.",
    NOT_PURCHASED: "Only customers who purchased this product can review it.",
    NOT_DELIVERED: "You can review this product once your order is delivered.",
};

const ReviewForm = ({ productId, eligibility, myReview, isEditing, onEditingChange }) => {
    const createReview = useCreateReview(productId);
    const updateReview = useUpdateReview(productId);

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: myReview?.rating ?? 0, body: myReview?.body ?? "" },
    });

    if (!eligibility) return null;

    // Note: this branch now only fires when there's no myReview card rendered 
    // (e.g. fallback / before first load) — CustomerFeedback hides the form
    // when the pinned card is showing, so this is mostly a safety net.
    if (eligibility.hasReview && !isEditing) {
        return (
            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                <span>You've already reviewed this product.</span>
                <button type="button" onClick={() => onEditingChange(true)} className="font-semibold text-primary hover:underline">
                    Edit your review
                </button>
            </div>
        );
    }

    if (!eligibility.canReview && !isEditing) {
        return (
            <p className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-500">
                {ELIGIBILITY_MESSAGES[eligibility.reason] ?? "You can't review this product right now."}
            </p>
        );
    }

    const onSubmit = (values) => {
        const mutation = isEditing ? updateReview : createReview;
        const payload = isEditing ? { id: myReview.id, ...values } : values;

        mutation.mutate(payload, {
            onSuccess: () => {
                reset();
                onEditingChange(false);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 rounded-lg border border-gray-100 p-4">
            <Controller
                control={control}
                name="rating"
                render={({ field }) => (
                    <StarRating rating={field.value} size="lg" interactive onChange={field.onChange} />
                )}
            />
            {errors.rating && <p className="text-xs text-red-500">{errors.rating.message}</p>}

            <textarea
                {...register("body")}
                rows={3}
                placeholder="Share your experience with this product..."
                className="rounded-lg border border-gray-200 p-3 text-sm focus:border-primary focus:outline-none"
            />
            {errors.body && <p className="text-xs text-red-500">{errors.body.message}</p>}

            <div className="flex gap-2 self-end">
                {isEditing && (
                    <button type="button" onClick={() => onEditingChange(false)} className="px-4 py-2 text-sm font-semibold text-gray-500">
                        Cancel
                    </button>
                )}
                <button type="submit" disabled={isSubmitting} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
                    {isEditing ? "Update Review" : "Post Review"}
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;