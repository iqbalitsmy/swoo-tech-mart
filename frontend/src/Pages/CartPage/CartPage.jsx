import Breadcrumb from '@/Components/Shared/Breadcrumb/Breadcrumb';
import { Checkbox } from '@/Components/ui/checkbox';
import { ChevronRight, Heart, Minus, Plus, Store, Trash2 } from 'lucide-react';
import React, { useState } from 'react';


const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pages", href: "" },
    { label: "Cart", href: "/cart" },
]

const initialItems = [
    {
        id: 1,
        shop: 'Digital EXPO',
        name: 'HP ProBook 450 G6 Core i5 8th Gen 256GB SSD Laptop',
        variant: 'No Brand, Color Family: Silver',
        stockNote: 'Only 2 item(s) in stock',
        price: 36500,
        oldPrice: 42000,
        qty: 1,
        image:
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80',
        checked: true,
    },
    {
        id: 2,
        shop: 'TechFev',
        name: 'Lenovo ThinkPad 13 (2nd Gen) – Intel Core i5 7th Gen, 4GB RAM, 128GB SSD, 13.3" Business',
        variant: 'No Brand',
        stockNote: '',
        price: 18500,
        oldPrice: null,
        qty: 2,
        image:
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&q=80',
        checked: false,
    },
];

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

const CartPage = () => {
    const [items, setItems] = useState(initialItems);
    const [voucher, setVoucher] = useState('');

    const shops = [...new Set(items.map((i) => i.shop))];

    const updateQty = (id, delta) => {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
            )
        );
    };

    const toggleItem = (id) => {
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
        );
    };

    const toggleShop = (shop) => {
        const shopItems = items.filter((i) => i.shop === shop);
        const allChecked = shopItems.every((i) => i.checked);
        setItems((prev) =>
            prev.map((i) =>
                i.shop === shop ? { ...i, checked: !allChecked } : i
            )
        );
    };

    const toggleAll = () => {
        const allChecked = items.every((i) => i.checked);
        setItems((prev) => prev.map((i) => ({ ...i, checked: !allChecked })));
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const checkedItems = items.filter((i) => i.checked);
    const checkedCount = checkedItems.length;
    const subtotal = checkedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingFee = checkedCount > 0 ? 195 : 0;
    const total = subtotal + shippingFee;
    const allChecked = items.length > 0 && items.every((i) => i.checked);

    return (
        <div className='min-h-screen'>
            <Breadcrumb items={breadcrumbItems} />
            {/* cart */}
            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                    {/* ---------- Cart items ---------- */}
                    <div className="space-y-4">
                        {/* Select all bar */}
                        <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <Checkbox
                                    checked={allChecked}
                                    onCheckedChange={toggleAll}
                                    className="cursor-pointer"
                                />

                                SELECT ALL ({items.length} ITEM{items.length !== 1 && 'S'})
                            </label>
                            <button
                                onClick={() =>
                                    setItems((prev) => prev.filter((i) => !i.checked))
                                }
                                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>

                        {/* Grouped by shop */}
                        {
                            shops.map((shop) => {
                                const shopItems = items.filter((i) => i.shop === shop);
                                const shopChecked = shopItems.every((i) => i.checked);

                                return (
                                    <div
                                        key={shop}
                                        className="rounded-md bg-white shadow-sm"
                                    >
                                        {/* Shop header */}
                                        <label className="flex cursor-pointer items-center gap-2 border-b border-gray-100 px-4 py-3">
                                            <Checkbox
                                                checked={shopChecked}
                                                onCheckedChange={() => toggleShop(shop)}
                                                className="cursor-pointer"
                                            />
                                            <Store className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm font-semibold text-gray-800">
                                                {shop}
                                            </span>
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </label>

                                        {/* Items */}
                                        <div className="divide-y divide-gray-100">
                                            {shopItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex gap-3 px-4 py-4"
                                                >
                                                    <Checkbox
                                                        checked={item.checked}
                                                        onCheckedChange={() => toggleItem(item.id)}
                                                        className="mt-8 cursor-pointer"
                                                    />

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-20 w-20 shrink-0 rounded object-cover"
                                                    />

                                                    <div className="min-w-0 flex-1">
                                                        <p className="line-clamp-2 text-sm font-medium text-gray-800">
                                                            {item.name}
                                                        </p>
                                                        {item.variant && (
                                                            <p className="mt-1 text-xs text-gray-400">
                                                                {item.variant}
                                                            </p>
                                                        )}
                                                        {item.stockNote && (
                                                            <p className="mt-1 text-xs font-medium text-red-500">
                                                                {item.stockNote}
                                                            </p>
                                                        )}

                                                        <div className="mt-3 flex items-center gap-3">
                                                            <button
                                                                aria-label="Save for later"
                                                                className="text-gray-400 hover:text-primary"
                                                            >
                                                                <Heart className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                aria-label="Remove item"
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-gray-400 hover:text-red-500"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex shrink-0 flex-col items-end justify-between">
                                                        <div className="text-right">
                                                            <p className="text-base font-semibold text-primary">
                                                                {formatTaka(item.price)}
                                                            </p>
                                                            {item.oldPrice && (
                                                                <p className="text-xs text-gray-400 line-through">
                                                                    {formatTaka(item.oldPrice)}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center rounded border border-gray-200">
                                                            <button
                                                                onClick={() => updateQty(item.id, -1)}
                                                                aria-label="Decrease quantity"
                                                                className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                                                                disabled={item.qty <= 1}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="w-8 text-center text-sm font-medium text-gray-700">
                                                                {item.qty}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQty(item.id, 1)}
                                                                aria-label="Increase quantity"
                                                                className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        }

                        {items.length === 0 && (
                            <div className="rounded-md bg-white px-4 py-12 text-center text-sm text-gray-400 shadow-sm">
                                Your cart is empty.
                            </div>
                        )}
                    </div>

                    {/* ---------- Order summary ---------- */}
                    <div className="h-fit rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Order Summary
                        </h2>

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
                            <span className="text-lg font-bold text-primary">
                                {formatTaka(total)}
                            </span>
                        </div>

                        <button
                            type="button"
                            disabled={checkedCount === 0}
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