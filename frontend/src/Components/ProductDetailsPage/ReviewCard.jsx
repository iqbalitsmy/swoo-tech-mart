import React from "react";
import timeAgo from "../../utiles/timeAgo";
import StarRating from "../Shared/StarRating/StarRating";
import { useDeleteReview } from "@/hooks/useReviews";
import { Edit, Trash2 } from "lucide-react";

const ReviewCard = ({ review, productId, isOwn = false, onEdit }) => {
    const { reviewer, rating, body, createdAt } = review;
    const initials = reviewer.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const deleteReview = useDeleteReview(productId);

    const handleDelete = () => {
        if (window.confirm("Delete your review? This can't be undone.")) {
            deleteReview.mutate(review.id);
        }
    };

    return (
        <div className={`flex flex-col gap-2 border-t border-gray-100 pt-4 py-2 ${isOwn ? "-mx-3 rounded-lg bg-primary/5 px-3" : ""}`}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-white text-sm font-bold">
                        {reviewer.avatarUrl
                            ? <img src={reviewer.avatarUrl} alt={reviewer.name} className="h-full w-full object-cover" />
                            : initials}
                    </span>
                    <div>
                        <p className="text-sm font-bold text-gray-900">
                            {reviewer.name}
                            {isOwn && <span className="ml-1 text-xs font-normal text-primary">(You)</span>}
                        </p>
                        <StarRating rating={rating} size="sm" />
                    </div>
                </div>
                <span className="shrink-0 text-xs text-gray-400">{timeAgo(createdAt)}</span>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">{body}</p>

            {isOwn && (
                <div className="flex gap-2 text-xs font-semibold">
                    <button onClick={onEdit} className="text-primary hover:text-primary-dark cursor-pointer">
                        <Edit className="h-4" />
                    </button>
                    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 cursor-pointer">
                        <Trash2 className="h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;