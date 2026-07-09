import React, { useState } from 'react';
import { Trash2, ShoppingCart, ChevronRight, Store, Check } from 'lucide-react';
import Breadcrumb from '@/Components/Shared/Breadcrumb/Breadcrumb';

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pages", href: "" },
    { label: "Wishlist", href: "/wishlist" },
]

const initialItems = [
    {
        id: 1,
        shop: 'Digital EXPO',
        name: 'HP ProBook 450 G6 Core i5 8th Gen 256GB SSD Laptop',
        variant: 'No Brand, Color Family: Silver',
        price: 36500,
        oldPrice: 42000,
        inStock: true,
        image:
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80',
        checked: true,
    },
    {
        id: 2,
        shop: 'Digital EXPO',
        name: 'Dell Latitude 5490 Core i5 8th Gen 8GB RAM 256GB SSD',
        variant: 'No Brand, Color Family: Black',
        price: 28500,
        oldPrice: null,
        inStock: false,
        image:
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&q=80',
        checked: false,
    },
    {
        id: 3,
        shop: 'TechFev',
        name: 'Lenovo ThinkPad 13 (2nd Gen) – Intel Core i5 7th Gen, 4GB RAM, 128GB SSD, 13.3" Business',
        variant: 'No Brand',
        price: 18500,
        oldPrice: null,
        inStock: true,
        image:
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&q=80',
        checked: false,
    },
];

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

const CustomCheckbox = ({ checked, onChange, className = '' }) => (
    <label className={`relative inline-flex shrink-0 cursor-pointer ${className}`}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
        />
        <div
            className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors
                ${checked ? 'border-primary bg-primary' : 'border-gray-300 bg-white'}
                peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1`}
        >
            {checked && <Check className="h-3.5 w-3.5 stroke-[3] text-white" />}
        </div>
    </label>
);

const Wishlist = () => {
    const [items, setItems] = useState(initialItems);

    const shops = [...new Set(items.map((i) => i.shop))];

    const toggleItem = (id) => {
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
        );
    };

    const toggleShop = (shop) => {
        const shopItems = items.filter((i) => i.shop === shop);
        const allChecked = shopItems.every((i) => i.checked);
        setItems((prev) =>
            prev.map((i) => (i.shop === shop ? { ...i, checked: !allChecked } : i))
        );
    };

    const toggleAll = () => {
        const allChecked = items.every((i) => i.checked);
        setItems((prev) => prev.map((i) => ({ ...i, checked: !allChecked })));
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const removeChecked = () => {
        setItems((prev) => prev.filter((i) => !i.checked));
    };

    const moveToCart = (id) => {
        // hook up to your actual cart logic here
        console.log('Move to cart:', id);
        removeItem(id);
    };

    const checkedItems = items.filter((i) => i.checked);
    const checkedCount = checkedItems.length;
    const allChecked = items.length > 0 && items.every((i) => i.checked);

    return (
        <section className='min-h-screen'>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mx-auto max-w-6xl px-4 py-8">
                <h1 className="mb-4 text-xl font-bold text-gray-800">
                    My Wishlist ({items.length})
                </h1>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
                    {/* ---------- Wishlist items ---------- */}
                    <div className="space-y-4">
                        {/* Select all bar */}
                        <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <CustomCheckbox checked={allChecked} onChange={toggleAll} />
                                SELECT ALL ({items.length} ITEM{items.length !== 1 && 'S'})
                            </label>
                            <button
                                onClick={removeChecked}
                                disabled={checkedCount === 0}
                                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>

                        {/* Grouped by shop */}
                        {shops.map((shop) => {
                            const shopItems = items.filter((i) => i.shop === shop);
                            const shopChecked = shopItems.every((i) => i.checked);

                            return (
                                <div key={shop} className="rounded-md bg-white shadow-sm">
                                    {/* Shop header */}
                                    <label className="flex cursor-pointer items-center gap-2 border-b border-gray-100 px-4 py-3">
                                        <CustomCheckbox
                                            checked={shopChecked}
                                            onChange={() => toggleShop(shop)}
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
                                            <div key={item.id} className="flex gap-3 px-4 py-4">
                                                <CustomCheckbox
                                                    checked={item.checked}
                                                    onChange={() => toggleItem(item.id)}
                                                    className="mt-8"
                                                />

                                                <div className="relative h-20 w-20 shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className={`h-20 w-20 rounded object-cover ${!item.inStock && 'opacity-40'
                                                            }`}
                                                    />
                                                    {!item.inStock && (
                                                        <span className="absolute inset-0 flex items-center justify-center rounded bg-black/30 text-[10px] font-semibold uppercase text-white">
                                                            Out of stock
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="line-clamp-2 text-sm font-medium text-gray-800">
                                                        {item.name}
                                                    </p>
                                                    {item.variant && (
                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {item.variant}
                                                        </p>
                                                    )}

                                                    <div className="mt-3 flex items-center gap-3">
                                                        <button
                                                            onClick={() => moveToCart(item.id)}
                                                            disabled={!item.inStock}
                                                            className="flex items-center gap-1.5 rounded border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent"
                                                        >
                                                            <ShoppingCart className="h-3.5 w-3.5" />
                                                            Add to Cart
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

                                                <div className="flex shrink-0 flex-col items-end justify-start text-right">
                                                    <p className="text-base font-semibold text-primary">
                                                        {formatTaka(item.price)}
                                                    </p>
                                                    {item.oldPrice && (
                                                        <p className="text-xs text-gray-400 line-through">
                                                            {formatTaka(item.oldPrice)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

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
                            <span>Total value</span>
                            <span className="font-semibold text-primary">
                                {formatTaka(
                                    checkedItems.reduce((sum, i) => sum + i.price, 0)
                                )}
                            </span>
                        </div>

                        <button
                            type="button"
                            disabled={checkedCount === 0}
                            onClick={() => checkedItems.forEach((i) => moveToCart(i.id))}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            ADD SELECTED TO CART ({checkedCount})
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Wishlist;