import React from "react";
import StarRating from "../Shared/StarRating/StarRating";

const RatingSummary = ({ averageRating, totalRatings }) => {
  return (
    <div className="text-center sm:text-left">
      <p className="text-5xl font-bold text-gray-900">{averageRating?.toFixed(1) ?? "0.0"}</p>
      <StarRating rating={averageRating ?? 0} size="md" />
      <p className="mt-1 text-sm text-gray-500">{averageRating?.toFixed(1) ?? "0.0"} out of 5</p>
      <p className="text-xs text-gray-400">{totalRatings ?? 0} rating{totalRatings === 1 ? "" : "s"}</p>
    </div>
  );
};

export default RatingSummary;