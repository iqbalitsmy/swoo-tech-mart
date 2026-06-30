import React, { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import StarRating from "./StarRating";


const STOCK_BADGES = {
    out: { label: "Out", className: "bg-danger text-white" },
    preorder: { label: "Pre", className: "bg-gray-700 text-white" },
};

const ProductCardHorizontal = ({ product }) => {
    const {
        title,
        price,
        oldPrice,
        thumbnail,
        rating,
        stock,
        addToCard = false,
    } = product;

    const [isInCart, setIsInCart] = useState(addToCard);

    const stockBadge = STOCK_BADGES[stock];

    return (
        <div className="group relative flex w-full items-center gap-3 rounded-xl border border-solid border-gray-200 bg-white p-3 transition hover:border hover:border-gray-300">
            {/* Image area */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">

                {
                    stockBadge && (
                        <span
                            className={`absolute left-0.5 top-0.5 z-10 rounded px-1 py-0.5 text-[8px] font-bold uppercase leading-none tracking-wide ${stockBadge.className}`}
                        >
                            {stockBadge.label}
                        </span>
                    )
                }

                <a href="" className="cursor-pointer">
                    <img
                        className="h-full max-h-16 w-full object-contain mx-auto"
                        loading="lazy"
                        src={thumbnail}
                        alt={title}
                    />
                </a>


            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                <div className="min-w-0">
                    <p className="truncate text-xs font-medium hover:text-gray-700">
                        <a href="">{title}</a>
                    </p>

                    <div className="mt-0.5 flex items-baseline gap-1">
                        <span
                            className={`text-sm font-bold ${oldPrice ? "text-danger" : "text-gray-900"
                                }`}
                        >
                            ${price?.toFixed(2)}
                        </span>
                        {oldPrice && (
                            <span className="text-[10px] text-gray-400 line-through">
                                ${oldPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <div className="mt-1 origin-left scale-90">
                        <StarRating rating={rating} />
                    </div>
                </div>

                {/* Cart button*/}
                <button
                    onClick={() => setIsInCart((prev) => !prev)}
                    aria-label={isInCart ? `Remove ${title} from cart` : `Add ${title} to cart`}
                    aria-pressed={isInCart}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${isInCart
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
                        }`}
                >
                    {
                        isInCart ? (
                            <Check className="h-3.5 w-3.5" />
                        ) : (
                            <ShoppingBag className="h-3.5 w-3.5" />
                        )
                    }
                </button>
            </div>
        </div>
    );
};

export default ProductCardHorizontal;