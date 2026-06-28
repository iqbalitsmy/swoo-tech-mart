import { Star, StarHalf } from 'lucide-react';
import React from 'react';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return (
        <div className="flex items-center gap-0.5">
            {
                Array.from({ length: 5 }).map((_, i) => {
                    if (i < fullStars) {
                        return (
                            <Star
                                key={i}
                                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                            />
                        );
                    }
                    if (i === fullStars && hasHalf) {
                        return (
                            <StarHalf
                                key={i}
                                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                            />
                        );
                    }
                    return <Star key={i} className="h-3.5 w-3.5 text-gray-200" />;
                })
            }
        </div>
    );
};

export default StarRating;