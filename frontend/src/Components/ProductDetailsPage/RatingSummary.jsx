import React from 'react';
import StarRating from '../Shared/StarRating/StarRating';

const RatingSummary = ({ averageRating, totalRatings, ratingBreakdown }) => {
    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Left: big average + star row */}
            <div className="shrink-0 text-center sm:text-left">
                <p className="text-5xl font-bold text-gray-900">{averageRating}</p>
                <StarRating rating={averageRating} size="md" />
                <p className="mt-1 text-sm text-gray-500">
                    {averageRating} out of 5
                </p>
                <p className="text-xs text-gray-400">{totalRatings} rating</p>
            </div>

            {/* Right: 5→1 star breakdown bars */}
            <div className="flex flex-1 flex-col gap-2">
                {[5, 4, 3, 2, 1].map((star) => {
                    const pct = ratingBreakdown[star] ?? 0;
                    return (
                        <div key={star} className="flex items-center gap-3">
                            <StarRating rating={star} size="sm" />
                            <div className="flex-1 overflow-hidden rounded-full bg-gray-200 h-2.5">
                                <div
                                    className="h-2.5 rounded-full bg-amber-400 transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <span className="w-8 text-right text-xs font-medium text-gray-500">
                                {pct}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingSummary;