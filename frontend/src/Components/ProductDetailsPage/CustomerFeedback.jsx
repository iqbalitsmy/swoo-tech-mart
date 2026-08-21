import React, { useState } from "react";
import { useProductReviews, useReviewEligibility } from "@/hooks/useReviews";
import RatingSummary from "./RatingSummary";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

const PAGE_SIZE = 5;

const CustomerFeedback = ({ id: productId }) => {
    const [isEditing, setIsEditing] = useState(false);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useProductReviews(productId, { size: PAGE_SIZE, sort: "newest" });
    const { data: eligibility } = useReviewEligibility(productId);

    if (isLoading) return null;
    if (isError || !data) return null;

    const firstPage = data.pages[0];
    const { averageRating, totalReview, myReview } = firstPage;
    const allReviews = data.pages.flatMap((p) => p.reviews.content);
    const otherReviews = allReviews.filter((r) => r.id !== myReview?.id);

    return (
        <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Customer Feedback</h2>

            <RatingSummary averageRating={averageRating} totalRatings={totalReview} />

            {/* Hide the form entirely while the pinned card is showing its own edit UI, 
                to avoid two "post/update" affordances on screen at once. */}
            {!(myReview && !isEditing) && (
                <ReviewForm
                    productId={productId}
                    eligibility={eligibility}
                    myReview={myReview}
                    isEditing={isEditing}
                    onEditingChange={setIsEditing}
                />
            )}

            <div className="flex flex-col gap-4">
                {myReview && !isEditing && (
                    <ReviewCard
                        review={myReview}
                        productId={productId}
                        isOwn
                        onEdit={() => setIsEditing(true)}
                    />
                )}
                {otherReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} productId={productId} />
                ))}
            </div>

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="w-fit rounded-lg border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:opacity-50"
                >
                    {isFetchingNextPage ? "Loading..." : "Load More..."}
                </button>
            )}
        </div>
    );
};

export default CustomerFeedback;