import React, { useEffect, useState } from 'react';
import { Trash2, ShoppingCart, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/Components/Shared/Breadcrumb/Breadcrumb';
import { useClearWishlist, useGetWishlist, useRemoveFromWishlist } from '@/hooks/useWishlist';
import CustomCheckBox from '@/Components/Shared/CustomCheckBox/CustomCheckBox';

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pages", href: "" },
    { label: "Wishlist", href: "/wishlist" },
];

const formatTaka = (n) => `৳ ${(n ?? 0).toLocaleString('en-US')}`;


const formatPriceRange = (minPrice, maxPrice) =>
    minPrice === maxPrice ? formatTaka(minPrice) : `${formatTaka(minPrice)} – ${formatTaka(maxPrice)}`;

const STOCK_LABELS = {
    IN_STOCK: { label: 'In stock', className: 'text-gray-500' },
    LOW_STOCK: { label: 'Low stock', className: 'text-amber-600' },
    OUT_OF_STOCK: { label: 'Out of stock', className: 'text-red-500' },
};

const Wishlist = () => {
    const navigate = useNavigate();
    const { data: wishlist, isLoading, isError, error } = useGetWishlist();
    const items = wishlist?.items ?? [];

    const [checkedIds, setCheckedIds] = useState(new Set()); // keyed by item.id (wishlist row id)

    useEffect(() => {
        if (!wishlist) return;
        setCheckedIds((prev) => {
            const validIds = new Set(items.map((i) => i.id));
            return new Set([...prev].filter((id) => validIds.has(id)));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishlist]);


    const { mutateAsync: removeFromWishlist, variables: removeVars, isPending: isRemoving } =
        useRemoveFromWishlist();
    const { mutate: clearWishlist, isPending: isClearing } = useClearWishlist();

    if (isLoading) {
        return <div className="mx-auto max-w-6xl px-4 py-12 text-sm text-gray-500">Loading wishlist...</div>;
    }

    if (isError) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-12 text-sm text-red-500">
                Failed to load wishlist{error?.message ? `: ${error.message}` : '.'}
            </div>
        );
    }

    const toggleItem = (id) => {
        setCheckedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleAll = () => {
        const allChecked = items.length > 0 && items.every((i) => checkedIds.has(i.id));
        setCheckedIds(allChecked ? new Set() : new Set(items.map((i) => i.id)));
    };

    const removeItem = (productId) => {
        removeFromWishlist(productId).catch(() => {
            // TODO: onError toast
        });
    };

    // CHANGED: sequential await instead of forEach - see hook comment above.
    const removeChecked = async () => {
        for (const item of checkedItems) {
            await removeFromWishlist(item.product.id).catch(() => {
                // TODO: onError toast - decide whether to stop the loop on
                // first failure or continue removing the rest
            });
        }
    };

    const handleClearWishlist = () => {
        clearWishlist(undefined, {
            // TODO: onError toast
        });
    };

    const goToProduct = (product) => {
        navigate(`/product-details/${product.slug}`);
    };

    const checkedItems = items.filter((i) => checkedIds.has(i.id));
    const checkedCount = checkedItems.length;
    const allChecked = items.length > 0 && items.every((i) => checkedIds.has(i.id));

    const totalValue = checkedItems.reduce((sum, i) => sum + i.product.minPrice, 0);

    return (
        <section className="min-h-screen">
            <Breadcrumb items={breadcrumbItems} />
            <div className="mx-auto max-w-6xl px-4 py-8">
                <h1 className="mb-4 text-xl font-bold text-gray-800">
                    My Wishlist ({items.length})
                </h1>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
                    {/* ---------- Wishlist items ---------- */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <CustomCheckBox checked={allChecked} onChange={toggleAll} />
                                SELECT ALL ({items.length} ITEM{items.length !== 1 && 'S'})
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={removeChecked}
                                    disabled={checkedCount === 0}
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                                <button
                                    onClick={handleClearWishlist}
                                    disabled={items.length === 0 || isClearing}
                                    className="text-sm text-gray-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {isClearing ? "Clearing..." : "Clear all"}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-md bg-white shadow-sm">
                            <div className="divide-y divide-gray-100">
                                {items.map((item) => {
                                    // CHANGED: product summary is nested under item.product now.
                                    const { product } = item;
                                    const stockInfo = STOCK_LABELS[product.stockStatus] ?? STOCK_LABELS.IN_STOCK;
                                    const isOutOfStock = product.stockStatus === 'OUT_OF_STOCK';
                                    const isThisRemoving = isRemoving && removeVars === product.id;

                                    return (
                                        <div key={item.id} className="flex gap-3 px-4 py-4">
                                            <CustomCheckBox
                                                checked={checkedIds.has(item.id)}
                                                onChange={() => toggleItem(item.id)}
                                                className="mt-8"
                                            />

                                            <div className="relative h-20 w-20 shrink-0">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.title}
                                                    className={`h-20 w-20 rounded object-cover ${isOutOfStock && 'opacity-40'}`}
                                                />
                                                {isOutOfStock && (
                                                    <span className="absolute inset-0 flex items-center justify-center rounded bg-black/30 text-[10px] font-semibold uppercase text-white">
                                                        Out of stock
                                                    </span>
                                                )}
                                                {product.isNew && !isOutOfStock && (
                                                    <span className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
                                                        <Sparkles className="h-2.5 w-2.5" />
                                                        NEW
                                                    </span>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="line-clamp-2 text-sm font-medium text-gray-800">
                                                    {product.title}
                                                </p>
                                                <p className={`mt-1 text-xs font-medium ${stockInfo.className}`}>
                                                    {stockInfo.label}
                                                </p>

                                                <div className="mt-3 flex items-center gap-3">
                                                    <button
                                                        onClick={() => goToProduct(product)}
                                                        disabled={isOutOfStock}
                                                        className="flex items-center gap-1.5 rounded border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent"
                                                    >
                                                        <ShoppingCart className="h-3.5 w-3.5" />
                                                        {/* CHANGED: label reflects that this now navigates rather than
                                                            adds directly, since no variant is resolved here */}
                                                        View & Add to Cart
                                                    </button>
                                                    <button
                                                        aria-label="Remove item"
                                                        onClick={() => removeItem(product.id)}
                                                        disabled={isThisRemoving}
                                                        className="text-gray-400 hover:text-red-500 disabled:opacity-40"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 flex-col items-end justify-start text-right">
                                                <p className="text-base font-semibold text-primary">
                                                    {formatPriceRange(product.minPrice, product.maxPrice)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {items.length === 0 && (
                            <div className="rounded-md bg-white px-4 py-12 text-center text-sm text-gray-400 shadow-sm">
                                Your wishlist is empty.
                            </div>
                        )}
                    </div>

                    {/* ---------- Summary sidebar ---------- */}
                    <div className="h-fit rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">Wishlist Summary</h2>

                        <div className="mt-4 flex justify-between text-sm text-gray-500">
                            <span>Selected items</span>
                            <span className="text-gray-700">{checkedCount}</span>
                        </div>

                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                            <span>Total value (from)</span>
                            <span className="font-semibold text-primary">{formatTaka(totalValue)}</span>
                        </div>

                        {/* CHANGED: bulk "add selected to cart" removed entirely - it
                            required a resolved variantId per item, which no longer
                            exists on the wishlist response. Bringing this back needs
                            either a backend default-variant signal, or a UI flow that
                            asks the user to pick a variant per selected item before
                            adding - both bigger decisions than this component should
                            make silently. */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Wishlist;