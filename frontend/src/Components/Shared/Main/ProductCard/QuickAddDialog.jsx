import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageOff, X, ShoppingBag } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { useVariantMatrix } from '@/utils/Usevariantmatrix';
import { useGetProduct } from '@/hooks/useProduct';
import QuantityStepper from '@/components/ProductDetailsPage/QuantityStepper';
import VariantSelector from '@/components/ProductDetailsPage/VariantSelector';
import AddToCartButton from '@/components/ProductDetailsPage/AddToCartButton';
import WishlistButton from '@/components/ProductDetailsPage/WishlistButton';
import { useAddToCart } from '@/hooks/useCart';

const STOCK_LABELS = {
    IN_STOCK: { label: "In stock", dotClassName: "bg-primary" },
    LOW_STOCK: { label: "Low stock", dotClassName: "bg-amber-500" },
    OUT_OF_STOCK: { label: "Out of stock", dotClassName: "bg-danger" },
};

const LOW_STOCK_THRESHOLD = 5;

function resolveStockInfo(variant, product) {
    if (variant) {
        if (variant.stockQty === 0) return { key: 'OUT_OF_STOCK', qty: 0 };
        if (variant.stockQty <= LOW_STOCK_THRESHOLD) return { key: 'LOW_STOCK', qty: variant.stockQty };
        return { key: 'IN_STOCK', qty: variant.stockQty };
    }
    return { key: product?.stockStatus ?? 'IN_STOCK', qty: null };
}

const formatPrice = (value) =>
    new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0,
    }).format(value);

function DialogSkeleton() {
    return (
        <div className="flex animate-pulse flex-col gap-5 p-5 sm:p-6">
            <div className="h-4 w-2/3 rounded bg-gray-200" />
            <div className="flex gap-4">
                <div className="h-24 w-24 shrink-0 rounded-lg bg-gray-200" />
                <div className="flex flex-1 flex-col justify-center gap-2">
                    <div className="h-6 w-24 rounded bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
            </div>
            <div className="h-16 rounded-lg bg-gray-200" />
            <div className="h-12 rounded-lg bg-gray-200" />
        </div>
    );
}

// CHANGED: all the logic that depends on useVariantMatrix now lives in this
// inner component, which QuickAddDialog only mounts once `product` (and
// therefore `product.variants`) is real data — never with an empty array.
// That's what fixes the default-selection bug: useVariantMatrix's internal
// `useState(() => ...variants[0]...)` initializer now runs on THIS
// component's actual first render, by which point variants[0] already
// exists, so selectedAttributes locks in correctly from the start instead
// of locking in as {} while the product was still loading.
function QuickAddDialogBody({ product, onOpenChange }) {
    const navigate = useNavigate();
    const variants = product.variants ?? [];
    const { attributeTypes, selectedAttributes, selectedVariant, selectAttribute, isOptionAvailable } = useVariantMatrix(variants);

    const [quantity, setQuantity] = useState(1);
    const { mutate: addToCartForBuyNow, isPending: isBuyNowPending } = useAddToCart();

    useEffect(() => {
        setQuantity(1);
    }, [selectedVariant?.id]);

    const handleQuantityChange = (next) => {
        const max = selectedVariant ? Math.max(selectedVariant.stockQty, 1) : Infinity;
        setQuantity(Math.max(1, Math.min(next, max)));
    };

    const hasIncompleteSelection = variants.length > 0 && !selectedVariant;
    const stockInfo = resolveStockInfo(selectedVariant, product);
    const stockDisplay = STOCK_LABELS[stockInfo.key] ?? STOCK_LABELS.IN_STOCK;
    const isOutOfStock = stockInfo.key === 'OUT_OF_STOCK';
    const isSelectionBlocked = isOutOfStock || hasIncompleteSelection;

    const priceDisplay = selectedVariant
        ? formatPrice(selectedVariant.price)
        : product.minPrice === product.maxPrice
            ? formatPrice(product.minPrice)
            : `${formatPrice(product.minPrice)} – ${formatPrice(product.maxPrice)}`;

    const displayImage = selectedVariant?.images?.[0]?.url ?? product?.images?.[0]?.url;

    const handleBuyNow = () => {
        if (!selectedVariant?.id || isSelectionBlocked || isBuyNowPending) return;
        addToCartForBuyNow(
            { productId: product.id, variantId: selectedVariant.id, quantity },
            {
                onSuccess: () => {
                    onOpenChange(false);
                    navigate('/checkout');
                },
            }
        );
    };

    return (
        <div className="flex flex-col">
            <div className="relative flex items-center gap-4 bg-gray-50 p-5 pr-12">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
                    {displayImage ? (
                        <img src={displayImage} alt={product.title} className="h-full w-full object-contain" />
                    ) : (
                        <ImageOff className="h-7 w-7 text-gray-300" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <DialogHeader className="items-start gap-0 text-left">
                        <DialogTitle className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
                            {product.title}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Choose options and add {product.title} to your cart.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">{priceDisplay}</span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gray-600">
                        <span className={`h-1.5 w-1.5 rounded-full ${stockDisplay.dotClassName}`} />
                        {stockDisplay.label}
                        {stockInfo.key === 'LOW_STOCK' && stockInfo.qty != null && (
                            <span className="text-gray-400">· only {stockInfo.qty} left</span>
                        )}
                    </p>
                </div>

                <DialogClose className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm hover:text-gray-800">
                    {/* <X className="h-4 w-4" /> */}
                </DialogClose>
            </div>

            <div className="flex flex-col gap-5 p-5">
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

                <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                    <QuantityStepper quantity={quantity} onChange={handleQuantityChange} />
                    {selectedVariant && (
                        <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(selectedVariant.price * quantity)}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2.5">
                    <div className="flex gap-2.5">
                        <div className="flex-1">
                            <AddToCartButton
                                productId={product?.id}
                                variantId={selectedVariant?.id}
                                quantity={quantity}
                                disabled={isSelectionBlocked}
                                disabledLabel={hasIncompleteSelection ? "Select options" : "Out of Stock"}
                                onSuccess={() => onOpenChange(false)}
                            />
                        </div>
                        <WishlistButton product={product} compact />
                    </div>
                    <button
                        onClick={handleBuyNow}
                        disabled={isSelectionBlocked || isBuyNowPending}
                        className="w-full rounded-lg border border-amber-400 bg-amber-50 py-3 text-sm font-bold uppercase tracking-wide text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                        {isBuyNowPending ? "Processing…" : "Buy Now"}
                    </button>
                </div>

                <Link
                    to={`/product-details/${product.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="text-center text-xs font-medium text-primary hover:underline"
                >
                    View full details
                </Link>
            </div>
        </div>
    );
}

// CHANGED: QuickAddDialog itself no longer touches useVariantMatrix at all —
// it only decides WHEN to mount QuickAddDialogBody. That's the whole fix.
export default function QuickAddDialog({ slug, open, onOpenChange }) {
    const { data: product, isLoading, isError } = useGetProduct(slug, { enabled: open });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[88vh] w-[calc(100%-1.5rem)] max-w-[420px] overflow-y-auto rounded-2xl border-0 p-0 shadow-2xl">
                {isLoading && <DialogSkeleton />}

                {isError && (
                    <div className="flex h-64 flex-col items-center justify-center gap-2 px-6 text-center">
                        <ShoppingBag className="h-8 w-8 text-gray-300" />
                        <p className="text-sm text-gray-500">Couldn't load this product. Please try again.</p>
                    </div>
                )}
                {product && <QuickAddDialogBody key={product.id} product={product} onOpenChange={onOpenChange} />}
            </DialogContent>
        </Dialog>
    );
}