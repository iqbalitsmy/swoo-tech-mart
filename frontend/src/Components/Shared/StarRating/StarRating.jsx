import { Star, StarHalf } from 'lucide-react';
import React, { useState } from 'react';

const SIZE_MAP = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-7 w-7",
};

const StarRating = ({ rating = 0, size = "sm", interactive = false, onChange }) => {
    const [hoverValue, setHoverValue] = useState(null);
    const dim = SIZE_MAP[size] ?? SIZE_MAP.sm;

    // While hovering, preview that value; otherwise fall back to the real rating.
    const displayValue = hoverValue ?? rating;
    const full = Math.floor(displayValue);
    const half = !interactive && displayValue % 1 >= 0.5; // half-stars only make sense in read-only display

    if (!interactive) {
        return (
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                    if (i < full)
                        return <Star key={i} className={`${dim} fill-amber-400 text-amber-400`} />;
                    if (i === full && half)
                        return <StarHalf key={i} className={`${dim} fill-amber-400 text-amber-400`} />;
                    return <Star key={i} className={`${dim} text-gray-200`} />;
                })}
            </div>
        );
    }

    return (
        <div
            className="flex items-center gap-0.5"
            onMouseLeave={() => setHoverValue(null)}
            role="radiogroup"
            aria-label="Rating"
        >
            {
                Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    const isFilled = starValue <= displayValue;
                    return (
                        <button
                            key={i}
                            type="button"
                            role="radio"
                            aria-checked={starValue === rating}
                            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
                            onMouseEnter={() => setHoverValue(starValue)}
                            onClick={() => onChange?.(starValue)}
                            className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <Star
                                className={`${dim} ${isFilled ? "fill-amber-400 text-amber-400" : "text-gray-200"} transition-colors`}
                            />
                        </button>
                    );
                })
            }
        </div>
    );
};

export default StarRating;