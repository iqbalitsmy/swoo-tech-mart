import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import StarRating from "./StarRating";

/**
 * Compact horizontal variant of ProductCard — image on the left,
 * info stacked on the right, smaller overall footprint. Used for
 * "Recently Viewed" rows where many items need to fit in less space.
 */
const ProductCardHorizontal = ({ product }) => {
    const { title, price, thumbnail, rating } = product;

    return (
        <div className="group relative flex w-full items-center gap-3 rounded-xl border border-solid border-gray-200 bg-white p-3 transition hover:border hover:border-gray-300">
            {/* Image area */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                <a href="" className="cursor-pointer">
                    <img
                        className="h-full max-h-16 w-full object-contain mx-auto"
                        loading="lazy"
                        src={thumbnail}
                        alt={title}
                    />
                </a>

                {/* Wishlist icon — appears on hover, scaled down to fit the smaller image area */}
                <button
                    aria-label="Add to wishlist"
                    className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-gray-500 opacity-0 shadow-sm transition hover:text-danger group-hover:opacity-100"
                >
                    <Heart className="h-2.5 w-2.5" />
                </button>
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                <div className="min-w-0">
                    <p className="truncate text-xs font-medium hover:text-gray-700">
                        <a href="">{title}</a>
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-gray-900">
                        ${price?.toFixed(2)}
                    </p>
                    <div className="mt-1 origin-left scale-90">
                        <StarRating rating={rating} />
                    </div>
                </div>

                <button
                    aria-label={`Add ${title} to cart`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-primary hover:text-white"
                >
                    <ShoppingBag className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default ProductCardHorizontal;