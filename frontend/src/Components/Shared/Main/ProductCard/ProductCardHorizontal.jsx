import React, { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Link } from "react-router-dom";

const STOCK_BADGES = {
    OUT_OF_STOCK: { label: "Out", className: "bg-danger text-white" },
    PREORDER: { label: "Pre", className: "bg-gray-700 text-white" },
};

const ProductCardHorizontal = ({ product }) => {
    const {
        title,
        slug,
        imageUrl,
        minPrice,
        maxPrice,
        stockStatus,
        isNew,
    } = product;

    // No cart-membership field on this DTO — this only reflects local UI
    // state until wired to a real cart source (e.g. useCart()).
    const [isInCart, setIsInCart] = useState(false);

    // Known statuses get a proper badge; anything unrecognized still shows
    // (fail-loud) rather than silently vanishing.
    const stockBadge =
        stockStatus && stockStatus !== "IN_STOCK"
            ? STOCK_BADGES[stockStatus] ?? {
                label: stockStatus,
                className: "bg-gray-500 text-white",
            }
            : null;

    const isRange = minPrice != null && maxPrice != null && minPrice !== maxPrice;

    return (
        <div className="group relative flex w-full items-center gap-3 rounded-xl border border-solid border-gray-200 bg-white p-3 transition hover:border hover:border-gray-300">
            {/* Image area */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                {stockBadge && (
                    <span
                        className={`absolute left-0.5 top-0.5 z-10 rounded px-1 py-0.5 text-[8px] font-bold uppercase leading-none tracking-wide ${stockBadge.className}`}
                    >
                        {stockBadge.label}
                    </span>
                )}

                {isNew && !stockBadge && (
                    <span className="absolute left-0.5 top-0.5 z-10 rounded bg-primary px-1 py-0.5 text-[8px] font-bold uppercase leading-none tracking-wide text-white">
                        New
                    </span>
                )}

                <Link to={`/product-details/${slug}`} className="cursor-pointer">
                    <img
                        className="mx-auto h-full max-h-16 w-full object-contain"
                        loading="lazy"
                        src={imageUrl}
                        alt={title}
                    />
                </Link>
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                <div className="min-w-0">
                    <p className="truncate text-xs font-medium hover:text-gray-700">
                        <Link to={`/product-details/${slug}`}>{title}</Link>
                    </p>

                    <div className="mt-0.5 flex items-baseline gap-1">
                        <span className="text-sm font-bold text-gray-900">
                            {isRange
                                ? `$${minPrice.toFixed(2)} – $${maxPrice.toFixed(2)}`
                                : `$${(minPrice ?? maxPrice)?.toFixed(2)}`}
                        </span>
                    </div>
                </div>

                {/* Cart button */}
                <button
                    onClick={() => setIsInCart((prev) => !prev)}
                    aria-label={isInCart ? `Remove ${title} from cart` : `Add ${title} to cart`}
                    aria-pressed={isInCart}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${isInCart
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
                        }`}
                >
                    {isInCart ? (
                        <Check className="h-3.5 w-3.5" />
                    ) : (
                        <ShoppingBag className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCardHorizontal;