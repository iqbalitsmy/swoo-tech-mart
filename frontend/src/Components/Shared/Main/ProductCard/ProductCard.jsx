import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useAddToCart, useIsProductInCart } from "@/hooks/useCart";
// import { useAddToWishlist, useIsProductInWishlist, useRemoveFromWishlist } from "@/hooks/useWishlist";
import { Heart, ShoppingBag, ImageOff, Check } from "lucide-react";
import QuickAddDialog from "./QuickAddDialog";
import { useAddToCart, useIsProductInCart } from "@/hooks/useCart";
import { useAddToWishlist, useIsProductInWishlist, useRemoveFromWishlist } from "@/hooks/useWishlist";

const STOCK_BADGES = {
    OUT_OF_STOCK: { label: "Out of Stock", className: "bg-danger text-white" },
    LOW_STOCK: { label: "Low Stock", className: "bg-amber-600 text-white" },
};

const formatPrice = (value) =>
    new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0,
    }).format(value);

const ProductCard = ({ product }) => {
    const {
        id: productId,
        // CHANGED: `singleVariant`/`defaultVariantId` are the real fields
        // the API sends for this decision - replaced the old `hasRange`
        // check (which was inferring the same thing indirectly from
        // minPrice/maxPrice, and didn't match what the backend actually tells us).
        singleVariant,
        defaultVariantId,
        title,
        slug,
        imageUrl,
        minPrice,
        maxPrice,
        stockStatus,
        isNew,
    } = product;

    const navigate = useNavigate();

    // CHANGED: new - controls the quick-add dialog for multi-variant products.
    const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

    const cartItem = useIsProductInCart(productId, defaultVariantId);
    const isInCart = !!cartItem;
    const { mutate: addToCart, isPending: isAdding } = useAddToCart();

    const isWishlisted = useIsProductInWishlist(productId);
    const { mutate: addToWishlist, isPending: isAddingToWishlist } = useAddToWishlist();
    const { mutate: removeFromWishlist, isPending: isRemovingFromWishlist } = useRemoveFromWishlist();
    const isWishlistPending = isAddingToWishlist || isRemovingFromWishlist;

    const stockBadge = STOCK_BADGES[stockStatus];
    const isOutOfStock = stockStatus === 'OUT_OF_STOCK';
    const hasPrice = minPrice != null;
    const hasRange = hasPrice && maxPrice != null && maxPrice !== minPrice;

    // CHANGED: this is the actual feature request.
    // - Already in cart -> go look at it (unchanged behavior).
    // - singleVariant + a real defaultVariantId -> add directly, one click,
    //   no dialog, no navigation.
    // - Otherwise (singleVariant: false, defaultVariantId: null) -> open
    //   the quick-add dialog so they can pick options without leaving the
    //   listing page, instead of the old "just navigate to product-details"
    //   fallback.
    const handleCartClick = () => {
        if (isInCart) {
            navigate(`/product-details/${slug}`);
            return;
        }

        if (singleVariant && defaultVariantId) {
            addToCart(
                { productId, variantId: defaultVariantId, quantity: 1 },
                {
                    // CHANGED (bug fix): `toast` was never imported anywhere
                    // in this file/project - this would have thrown a
                    // ReferenceError on any failed add-to-cart request.
                    // Swapped for console.error until a real toast solution
                    // is wired up; replace this once you have one.
                    onError: (err) => {
                        console.error(`Couldn't add ${title} to cart:`, err);
                    },
                }
            );
            return;
        }

        setIsQuickAddOpen(true);
    };

    const handleWishlistClick = () => {
        if (isWishlistPending) return;
        if (isWishlisted) {
            removeFromWishlist(productId);
        } else {
            addToWishlist({
                productId,
                product: { productTitle: title, productSlug: slug, imageUrl, price: minPrice },
            });
        }
    };

    return (
        <div className="group relative flex w-full flex-col rounded-xl border border-solid border-gray-200 bg-white p-4 transition hover:border hover:border-gray-300">
            <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg">
                {stockBadge && (
                    <span className={`absolute left-2 top-2 z-10 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${stockBadge.className}`}>
                        {stockBadge.label}
                    </span>
                )}

                <Link to={`/product-details/${slug}`} className="cursor-pointer">
                    {imageUrl ? (
                        <img className="h-full max-h-50 w-full object-contain mx-auto" loading="lazy" src={imageUrl} alt={title} />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-300">
                            <ImageOff className="h-10 w-10" />
                        </div>
                    )}
                </Link>

                <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
                    <button
                        onClick={handleWishlistClick}
                        disabled={isWishlistPending}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        aria-pressed={isWishlisted}
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:text-danger ${isWishlisted ? "text-danger" : "text-gray-500"}`}
                    >
                        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-danger" : ""}`} />
                    </button>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
                <div>
                    <p className="text-sm font-medium hover:text-gray-700 line-clamp-2">
                        <Link to={`/product-details/${slug}`}>{title}</Link>
                    </p>
                    <div className="mt-1 flex items-baseline gap-1.5">
                        {hasPrice ? (
                            <span className="text-base font-bold text-gray-900">
                                {hasRange ? `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}` : formatPrice(minPrice)}
                            </span>
                        ) : (
                            <span className="text-xs font-normal text-gray-400">Price unavailable</span>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleCartClick}
                    disabled={isOutOfStock || isAdding}
                    aria-label={isInCart ? `View ${title} in cart` : `Add ${title} to cart`}
                    aria-pressed={isInCart}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${isOutOfStock
                        ? "cursor-not-allowed bg-gray-100 text-gray-300"
                        : isInCart
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
                        }`}
                >
                    {isInCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                </button>
            </div>

            {/* CHANGED: new - only fetches/renders its contents once opened. */}
            <QuickAddDialog slug={slug} open={isQuickAddOpen} onOpenChange={setIsQuickAddOpen} />
        </div>
    );
};

export default ProductCard;