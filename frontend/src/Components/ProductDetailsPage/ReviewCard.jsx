import React from 'react';
import timeAgo from '../../utiles/timeAgo';
import StarRating from '../Shared/StarRating/StarRating';

const ReviewCard = ({ review }) => {
    const { name, avatar, rating, timestamp, body } = review;
    const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-white text-sm font-bold">
                        {avatar
                            ? <img src={avatar} alt={name} className="h-full w-full object-cover" />
                            : initials
                        }
                    </span>

                    <div>
                        <p className="text-sm font-bold text-gray-900">{name}</p>
                        <StarRating rating={rating} size="sm" />
                    </div>
                </div>

                <span className="shrink-0 text-xs text-gray-400">{timeAgo(timestamp)}</span>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">{body}</p>
        </div>
    );
};

export default ReviewCard;