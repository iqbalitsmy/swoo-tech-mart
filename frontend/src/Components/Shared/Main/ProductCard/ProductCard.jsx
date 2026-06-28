import React from "react";
import { Heart, Eye, ShoppingBag, Star, StarHalf, Link } from "lucide-react";
import StarRating from "./StarRating";


const ProductCard = ({ product}) => {
    const { title, price, thumbnail, rating } = product;

    return (
        <div
            className="group relative flex w-full flex-col rounded-xl border border-solid border-gray-200 bg-white p-4 transition hover:border hover:border-gray-300"
        >
            {/* Image area */}
            <div
                className={"relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg"}
            >
                <a href="" className='cursor-pointer'>
                    <img className='h-full max-h-50 w-full object-contain mx-auto' loading="lazy" src={thumbnail} alt={title} />
                </a>

                {/* Hover action icons */}
                <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
                    <button
                        aria-label="Add to wishlist"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition hover:text-danger"
                    >
                        <Heart className="h-4 w-4" />
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
                    <p className="mt-1 text-base font-bold text-gray-900">
                        ${price?.toFixed(2)}
                    </p>
                    <div className="mt-1.5">
                        <StarRating rating={rating} />
                    </div>
                </div>

                <button
                    aria-label={`Add ${title} to cart`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-primary hover:text-white"
                >
                    <ShoppingBag className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;