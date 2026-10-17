import Breadcrumb from '@/Components/Shared/Breadcrumb/Breadcrumb';
import { Checkbox } from '@/Components/ui/checkbox';
import { useClearCart, useGetCart, useRemoveCartItem, useUpdateCartItemQty } from '@/hooks/useCart';
import { ChevronRight, Heart, Minus, Plus, Store, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pages", href: "" },
    { label: "Cart", href: "/cart" },
];

const formatTaka = (n) => `৳ ${(n ?? 0).toLocaleString('en-US')}`;

const formatAttributes = (attributes = []) => attributes.map((a) => `${a.attributeTypeName}: ${a.label}`).join(', ');


const CartPage = () => {
    const navigate = useNavigate();
    const { data: cartResponse, isLoading, isError, error } = useGetCart();

    const cart = cartResponse;
    const items = cart?.items ?? [];

    const [checkedIds, setCheckedIds] = useState(new Set());
    const [voucher, setVoucher] = useState('');

    useEffect(() => {
        if (!cart) return;
        setCheckedIds((prev) => {
            const validIds = new Set(items.map((i) => i.id));
            const next = new Set([...prev].filter((id) => validIds.has(id)));
            items.forEach((i) => {
                if (!prev.has(i.id) && !next.has(i.id)) next.add(i.id);
            });
            return next;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    const { mutate: updateQty, variables: updateQtyVars, isPending: isUpdatingQty } = useUpdateCartItemQty();
    const { mutate: removeItem, variables: removeVars, isPending: isRemoving } = useRemoveCartItem();
    const { mutate: clearCart, isPending: isClearing } = useClearCart();

    if (isLoading) {
        return <div className="container mx-auto max-w-6xl px-4 py-12 text-sm text-gray-500">Loading cart...</div>;
    }

    if (isError) {
        return (
            <div className="container mx-auto max-w-6xl px-4 py-12 text-sm text-red-500">
                Failed to load cart{error?.message ? `: ${error.message}` : '.'}
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

    const handleQtyChange = (item, delta) => {
        const nextQty = item.quantity + delta;
        if (nextQty < 1) return;
        updateQty(
            { itemId: item.id, quantity: nextQty },
            {
                // TODO: onError - surface "couldn't update quantity" (e.g. if
                // nextQty exceeds current stockQty, the backend re-validates
                // and this will reject)
            }
        );
    };

    const handleRemove = (itemId) => {
        removeItem(itemId, {
            // TODO: onError toast
        });
    };

    const handleDeleteChecked = () => {
        checkedItems.forEach((item) => handleRemove(item.id));
    };

    const handleClearCart = () => {
        clearCart(undefined, {
            // TODO: onError toast
        });
    };

    const checkedItems = items.filter((i) => checkedIds.has(i.id));
    const checkedCount = checkedItems.length;
    const subtotal = checkedItems.reduce((sum, i) => sum + i.currentPrice * i.quantity, 0);
    const shippingFee = checkedCount > 0 ? 195 : 0;
    const total = subtotal + shippingFee;
    const allChecked = items.length > 0 && items.every((i) => checkedIds.has(i.id));

    return (
        <div className="min-h-screen">
            <Breadcrumb items={breadcrumbItems} />
            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                    {/* ---------- Cart items ---------- */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <Checkbox checked={allChecked} onCheckedChange={toggleAll} className="cursor-pointer" />
                                SELECT ALL ({items.length} ITEM{items.length !== 1 && 'S'})
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleDeleteChecked}
                                    disabled={checkedCount === 0}
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                                <button
                                    onClick={handleClearCart}
                                    disabled={items.length === 0 || isClearing}
                                    className="text-sm text-gray-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {isClearing ? "Clearing..." : "Empty cart"}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-md bg-white shadow-sm">
                            <div className="divide-y divide-gray-100">
                                {
                                    items.map((item) => {
                                        const isThisQtyPending =
                                            isUpdatingQty && updateQtyVars?.itemId === item.id;
                                        const isThisRemovePending =
                                            isRemoving && removeVars === item.id;

                                        return (
                                            <div key={item.id} className="flex gap-3 px-4 py-4">
                                                <Checkbox
                                                    checked={checkedIds.has(item.id)}
                                                    onCheckedChange={() => toggleItem(item.id)}
                                                    className="mt-8 cursor-pointer"
                                                />

                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.productTitle}
                                                    className="h-20 w-20 shrink-0 rounded object-cover"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <p className="line-clamp-2 text-sm font-medium text-gray-800">
                                                        {item.productTitle}
                                                    </p>
                                                    {item.attributes?.length > 0 && (
                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {formatAttributes(item.attributes)}
                                                        </p>
                                                    )}
                                                    {!item.inStock && (
                                                        <p className="mt-1 text-xs font-medium text-red-500">
                                                            Out of stock
                                                        </p>
                                                    )}
                                                    {
                                                        item.priceChanged && (
                                                            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-amber-600">
                                                                <AlertTriangle className="h-3 w-3" />
                                                                Price changed since you added this
                                                            </p>
                                                        )
                                                    }

                                                    <div className="mt-3 flex items-center gap-3">
                                                        <button aria-label="Save for later" className="text-gray-400 hover:text-primary">
                                                            <Heart className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            aria-label="Remove item"
                                                            onClick={() => handleRemove(item.id)}
                                                            disabled={isThisRemovePending}
                                                            className="text-gray-400 hover:text-red-500 disabled:opacity-40"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex shrink-0 flex-col items-end justify-between">
                                                    <div className="text-right">
                                                        <p className="text-base font-semibold text-primary">
                                                            {formatTaka(item.currentPrice)}
                                                        </p>
                                                        {item.priceChanged && (
                                                            <p className="text-xs text-gray-400 line-through">
                                                                {formatTaka(item.unitPriceSnapshot)}
                                                            </p>
                                                        )}
                                                        <p className="text-xs text-gray-400">
                                                            Line: {formatTaka(item.lineTotal)}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center rounded border border-gray-200">
                                                        <button
                                                            onClick={() => handleQtyChange(item, -1)}
                                                            aria-label="Decrease quantity"
                                                            className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                                                            disabled={item.quantity <= 1 || isThisQtyPending}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-medium text-gray-700">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQtyChange(item, 1)}
                                                            aria-label="Increase quantity"
                                                            className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                                                            disabled={isThisQtyPending}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>

                        {
                            items.length === 0 && (
                                <div className="rounded-md bg-white px-4 py-12 text-center text-sm text-gray-400 shadow-sm">
                                    Your cart is empty.
                                </div>
                            )
                        }
                    </div>

                    {/* ---------- Order summary ---------- */}
                    <div className="h-fit rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>

                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal ({checkedCount} items)</span>
                                <span className="text-gray-700">{formatTaka(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping Fee</span>
                                <span className="text-gray-700">{formatTaka(shippingFee)}</span>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <input
                                type="text"
                                value={voucher}
                                onChange={(e) => setVoucher(e.target.value)}
                                placeholder="Enter Voucher Code"
                                className="min-w-0 flex-1 rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <button
                                type="button"
                                className="shrink-0 rounded bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary/90"
                            >
                                APPLY
                            </button>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                            <span className="text-base font-medium text-gray-800">Total</span>
                            <span className="text-lg font-bold text-primary">{formatTaka(total)}</span>
                        </div>

                        <button
                            type="button"
                            disabled={checkedCount === 0}
                            onClick={() => navigate("/checkout")}
                            className="mt-4 w-full rounded bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            PROCEED TO CHECKOUT ({checkedCount})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;