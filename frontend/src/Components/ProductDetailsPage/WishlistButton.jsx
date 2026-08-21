import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAddToWishlist, useIsProductInWishlist, useRemoveFromWishlist } from '@/hooks/useWishlist';
import { Heart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// CHANGED: dropped `variantId` entirely. The earlier asymmetry note (check
// scoped to productId, add scoped to variantId) doesn't hold against the
// confirmed API — POST /wishlist/items body is `{ productId }` only, no
// variant-level wishlist endpoint exists. Wishlist is product-scoped end to
// end (matches the "wishlist = intent signal, cart = committed variant"
// design). This component now only ever needs `product` (id + display
// fields) and never blocks on variant selection.
// CHANGED: added `compact` prop. When true, renders as a square icon-only
// button (no text label) sized to sit next to Add to Cart in QuickAddDialog.
// Full behavior (auth redirect, optimistic mutation, disabled-while-pending)
// is unchanged — this only affects markup/sizing.
const WishlistButton = ({ product, compact = false }) => {
    const { id: productId, title, slug, imageUrl, minPrice, maxPrice, stockStatus, isNew } = product;

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isWishlisted = useIsProductInWishlist(isAuthenticated ? productId : undefined);
    const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist();
    const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();
    const isBusy = isAdding || isRemoving;

    const handleClick = () => {
        if (!productId) return;
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
            return;
        }
        if (isWishlisted) {
            removeFromWishlist(productId);
        } else {
            addToWishlist({
                productId,
                product: { id: productId, title, slug, imageUrl, minPrice, maxPrice, stockStatus, isNew },
            });
        }
    };

    if (compact) {
        return (
            <button
                type="button"
                onClick={handleClick}
                disabled={!productId || isBusy}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={!!isWishlisted}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition disabled:opacity-50 ${isWishlisted
                        ? "border-danger/30 bg-danger/5 text-danger"
                        : "border-gray-200 text-gray-500 hover:border-danger/30 hover:text-danger"
                    }`}
            >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-danger" : ""}`} />
            </button>
        );
    }

    const label = isWishlisted ? "Wishlist added" : "Add to wishlist";
    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={!productId || isBusy}
            aria-pressed={!!isWishlisted}
            className={`flex items-center gap-1.5 text-xs font-medium transition disabled:opacity-50 ${isWishlisted ? "text-danger" : "text-gray-600 hover:text-danger"}`}
        >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-danger" : ""}`} />
            {label}
        </button>
    );
};

export default WishlistButton;