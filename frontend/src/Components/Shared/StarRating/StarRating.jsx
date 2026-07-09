import { Star, StarHalf } from 'lucide-react';
import React from 'react';

const StarRating = ({ rating, size = "sm" }) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const dim = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    return (
        <div className="flex items-center gap-0.5">
            {
                Array.from({ length: 5 }).map((_, i) => {
                    if (i < full)
                        return <Star key={i} className={`${dim} fill-amber-400 text-amber-400`} />;
                    if (i === full && half)
                        return <StarHalf key={i} className={`${dim} fill-amber-400 text-amber-400`} />;
                    return <Star key={i} className={`${dim} text-gray-200`} />;
                })
            }
        </div>
    );
};

export default StarRating;