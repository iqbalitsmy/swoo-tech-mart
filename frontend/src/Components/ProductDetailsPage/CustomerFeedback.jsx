import React, { useState } from 'react';
import RatingSummary from './RatingSummary';
import ReviewCard from './ReviewCard';


const PAGE_SIZE = 2;

const CustomerFeedback = ({ feedback }) => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    if (!feedback) return null;

    const { averageRating, totalRatings, ratingBreakdown, reviews = [] } = feedback;
    const visibleReviews = reviews.slice(0, visibleCount);
    const hasMore = visibleCount < reviews.length;

    return (
        <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Customer Feedback</h2>

            <RatingSummary
                averageRating={averageRating}
                totalRatings={totalRatings}
                ratingBreakdown={ratingBreakdown}
            />

            {/* Review list */}
            <div className="flex flex-col gap-4">
                {
                    visibleReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                }
            </div>

            {/* Load More — increments by PAGE_SIZE, hides itself when all reviews shown */}
            {
                hasMore && (
                    <button
                        onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                        className="w-fit rounded-lg border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                        Load More...
                    </button>
                )
            }
        </div>
    );
};

export default CustomerFeedback;