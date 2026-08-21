import React, { useEffect, useState } from "react";
import { Heart, Truck } from "lucide-react";
import QuantityStepper from "./QuantityStepper";

import twitterIcon from "../../assets/icon/twitter.png"
import fbIcon from "../../assets/icon/fb.png"
import instagramIcon from "../../assets/icon/instagram.png"
import youtubeIcon from "../../assets/icon/youtube.png"
import pinterestIcon from "../../assets/icon/pinterest.png"
import PromoCallout from "./PromoCallout";
import VariantSelector from "./VariantSelector";
import { useVariantMatrix } from "@/utiles/Usevariantmatrix";
import WishlistButton from "./WishlistButton";
import AddToCartButton from "./AddToCartButton";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "@/hooks/useCart";

const socialIcons = [
    { icon: twitterIcon, label: "Twitter" },
    { icon: fbIcon, label: "Facebook" },
    { icon: instagramIcon, label: "Instagram" },
    { icon: youtubeIcon, label: "YouTube" },
];

const formatPrice = (value) =>
    new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0,
    }).format(value);

const STOCK_LABELS = {
    IN_STOCK: { label: "In stock", dotClassName: "bg-primary" },
    LOW_STOCK: { label: "Low stock", dotClassName: "bg-amber-500" },
    OUT_OF_STOCK: { label: "Out of stock", dotClassName: "bg-danger" },
};

// A variant only gives us a raw stockQty (no enum) - "low stock" below a
// certain count is a FRONTEND-ONLY heuristic, not something the API defines.
const LOW_STOCK_THRESHOLD = 5;

function resolveStockInfo(variant, product) {
    if (variant) {
        if (variant.stockQty === 0) return { key: 'OUT_OF_STOCK', qty: 0 };
        if (variant.stockQty <= LOW_STOCK_THRESHOLD) return { key: 'LOW_STOCK', qty: variant.stockQty };
        return { key: 'IN_STOCK', qty: variant.stockQty };
    }
    return { key: product?.stockStatus ?? 'IN_STOCK', qty: null };
}

export default function BuyBox({
    product,
    supportPhone,
    onAddToCart,
    onBuyNow,
    onVariantChange,
}) {
    const variants = product?.variants ?? [];
    const navigate = useNavigate();

    const { attributeTypes, selectedAttributes, selectedVariant, selectAttribute, isOptionAvailable } =
        useVariantMatrix(variants);

    const [quantity, setQuantity] = useState(1);

    // CHANGED: Buy Now reuses the SAME cart mutation as AddToCartButton -
    // there's only one cart endpoint (POST /api/cart/items), no separate
    // "buy now" API, so "Buy Now" = add to cart, then go straight to
    // checkout instead of staying on this page.
    const { mutate: addToCartForBuyNow, isPending: isBuyNowPending } = useAddToCart();

    const stockInfo = resolveStockInfo(selectedVariant, product);
    const stockDisplay = STOCK_LABELS[stockInfo.key] ?? STOCK_LABELS.IN_STOCK;
    const isOutOfStock = stockInfo.key === 'OUT_OF_STOCK';
    const hasIncompleteSelection = variants.length > 0 && !selectedVariant;
    const isSelectionBlocked = isOutOfStock || hasIncompleteSelection;
    const blockedLabel = hasIncompleteSelection ? "Select options" : "Out of Stock";

    const unitPrice = selectedVariant?.price ?? product?.minPrice ?? 0;
    const totalPrice = unitPrice * quantity;

    const handleQuantityChange = (next) => {
        const max = selectedVariant ? Math.max(selectedVariant.stockQty, 1) : Infinity;
        setQuantity(Math.max(1, Math.min(next, max)));
    };

    useEffect(() => {
        setQuantity(1);
        onVariantChange?.(selectedVariant ?? null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVariant]);

    const handleBuyNow = () => {
        if (!selectedVariant?.id || isSelectionBlocked || isBuyNowPending) return;
        addToCartForBuyNow(
            { productId: product.id, variantId: selectedVariant.id, quantity },
            {
                onSuccess: () => {
                    onBuyNow?.({ variantId: selectedVariant.id, quantity });
                    navigate('/checkout');
                },
            }
        );
    };


    return (
        <div className="flex w-full flex-col gap-5 rounded-xl bg-gray-50 p-5">
            {attributeTypes.length > 0 && (
                <div className="flex flex-col gap-4">
                    {attributeTypes.map((type) => {
                        const options = type.options.map((opt) => ({
                            value: opt.value,
                            label: opt.label,
                            disabled: !isOptionAvailable(type.id, opt.value),
                        }));
                        const selectedLabel = type.options.find(
                            (opt) => opt.value === selectedAttributes[type.id]
                        )?.label;

                        return (
                            <VariantSelector
                                key={type.id}
                                label={type.name}
                                selectedLabel={selectedLabel}
                                options={options}
                                selectedValue={selectedAttributes[type.id]}
                                onSelect={(value) => selectAttribute(type.id, value)}
                            />
                        );
                    })}
                </div>
            )}

            {/* Total price */}
            <div className={attributeTypes.length > 0 ? "border-t border-gray-200 pt-4" : ""}>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total price:
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                    {formatPrice(totalPrice)}
                </p>
            </div>

            {/* Stock status */}
            <p className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <span className={`h-2 w-2 rounded-full ${stockDisplay.dotClassName}`} />
                {stockDisplay.label}
                {stockInfo.key === 'LOW_STOCK' && stockInfo.qty != null && (
                    <span className="text-gray-400">— only {stockInfo.qty} left</span>
                )}
            </p>

            {/* Quantity + CTAs */}
            <div className="flex flex-col gap-3">
                <QuantityStepper quantity={quantity} onChange={handleQuantityChange} />

                {/* CHANGED: was an inline button calling onAddToCart? - now
                    delegates to AddToCartButton, which owns the real
                    POST /api/cart/items call. onAddToCart is still fired,
                    but only AFTER a successful request (e.g. for a parent
                    that wants to show a "added to cart" toast/mini-cart). */}
                <AddToCartButton
                    productId={product?.id}
                    variantId={selectedVariant?.id}
                    quantity={quantity}
                    disabled={isSelectionBlocked}
                    disabledLabel={blockedLabel}
                    onSuccess={onAddToCart}
                />

                <button
                    onClick={handleBuyNow}
                    disabled={isSelectionBlocked || isBuyNowPending}
                    className="w-full rounded-lg bg-amber-400 py-3 text-sm font-bold uppercase tracking-wide text-gray-900 transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                    {isBuyNowPending ? "Processing…" : "Buy Now"}
                </button>
            </div>

            {/* Wishlist / compare */}
            <div className="flex items-center gap-5 text-xs font-medium text-gray-600">
                <WishlistButton product={product} />
            </div>

            {/* Trust badges */}
            <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-700">Share item:</p>
                <div className="flex items-center gap-2">
                    {
                        socialIcons.map(({ icon, label }) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-primary hover:text-white"
                            >
                                <figure>
                                    <img src={icon} alt={label} />
                                </figure>
                            </a>
                        ))
                    }
                </div>
            </div>

            {/* Quick order block */}
            {
                supportPhone && (
                    <div className="rounded-lg bg-gray-900 p-4 text-white">
                        <p className="text-xs font-bold uppercase tracking-wide">
                            Quick Order 24/7
                        </p>
                        <a
                            href={`tel:${supportPhone}`}
                            className="mt-1 block text-lg font-bold hover:text-primary-light"
                        >
                            {supportPhone}
                        </a>
                    </div>
                )
            }
        </div>
    );
}