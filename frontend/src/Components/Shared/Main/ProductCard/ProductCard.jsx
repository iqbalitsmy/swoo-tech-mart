import React, { useState } from "react";
import { Heart, Eye, ShoppingBag, Star, StarHalf, Link, Check } from "lucide-react";
import StarRating from "./StarRating";

const STOCK_BADGES = {
    out: { label: "Out of Stock", className: "bg-danger text-white" },
    preorder: { label: "Pre-order", className: "bg-gray-700 text-white" },
};

const ProductCard = ({ product }) => {
    const {
        title,
        price,
        oldPrice,
        thumbnail,
        rating,
        stock,
        wishlist = false,
        addToCard = false,
    } = product;

    const [isWishlisted, setIsWishlisted] = useState(wishlist);
    const [isInCart, setIsInCart] = useState(addToCard);

    const stockBadge = STOCK_BADGES[stock];

    return (
        <div className="group relative flex w-full flex-col rounded-xl border border-solid border-gray-200 bg-white p-4 transition hover:border hover:border-gray-300">
            {/* Image area */}
            <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg">
                {/* Stock badge — rendered outside the opacity-0/group-hover wrapper
            below, so it's visible at all times, not just on hover. Only
            shows up when STOCK_BADGES has an entry for this product's stock
            value (i.e. "out" or "preorder"); "in" stock shows nothing. */}
                {stockBadge && (
                    <span
                        className={`absolute left-2 top-2 z-10 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${stockBadge.className}`}
                    >
                        {stockBadge.label}
                    </span>
                )}

                <a href="" className="cursor-pointer">
                    <img
                        className="h-full max-h-50 w-full object-contain mx-auto"
                        loading="lazy"
                        src={thumbnail}
                        alt={title}
                    />
                </a>

                {/* Hover action icons — wishlist toggle now reflects real state
            (filled red heart when active) instead of being a static icon. */}
                <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
                    <button
                        onClick={() => setIsWishlisted((prev) => !prev)}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        aria-pressed={isWishlisted}
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:text-danger ${isWishlisted ? "text-danger" : "text-gray-500"
                            }`}
                    >
                        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-danger" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="mt-3 flex items-center justify-between gap-2">
                <div>
                    {/* title */}
                    <p className="text-sm font-medium hover:text-gray-700 line-clamp-2">
                        <a href="">{title}</a>
                    </p>

                    {/* Price — shows old price struck through next to the current
              price whenever oldPrice exists, otherwise just the price alone. */}
                    <div className="mt-1 flex items-baseline gap-1.5">
                        <span
                            className={`text-base font-bold ${oldPrice ? "text-danger" : "text-gray-900"
                                }`}
                        >
                            ${price?.toFixed(2)}
                        </span>
                        {oldPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                ${oldPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <div className="mt-1.5">
                        <StarRating rating={rating} />
                    </div>
                </div>

                {/* Cart button — reflects addToCard from product data on load, then
            toggles on click. Switches to a checkmark + green fill once added,
            so it's clear at a glance which cards are already in the cart. */}
                <button
                    onClick={() => setIsInCart((prev) => !prev)}
                    aria-label={isInCart ? `Remove ${title} from cart` : `Add ${title} to cart`}
                    aria-pressed={isInCart}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${isInCart
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
                        }`}
                >
                    {isInCart ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <ShoppingBag className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;