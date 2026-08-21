import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Shared/Main/ProductCard/ProductCard";
// CHANGED: real data via the hook built for ProductsPage - reused as-is,
// no new API layer needed for this widget.
import { useGetProducts } from "@/hooks/useProduct";

// CHANGED: `param` (used for client-side categoryTags filtering) renamed to
// `sort`, matching the actual query param name the backend expects
// (?sort=bestselling / ?sort=newest).
const tabs = [
    { label: "Best Selling", sort: "bestselling" },
    { label: "New In", sort: "newest" },
];

// CHANGED: this is a homepage showcase widget, not a full listing page - capped
// on purpose so it doesn't try to render an entire catalog page's worth of cards.
const SHOWCASE_SIZE = 8;

// CHANGED: the hardcoded `products` array and `getProductsByTag()` are both
// gone - the backend now does the filtering (via ?sort=) instead of us
// filtering a static list by `categoryTags` client-side.

const ProductsTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    // Bumping this on every tab click gives each grid a fresh React key,
    // which restarts the CSS animation below instead of skipping it when
    // the same array length happens to repeat.
    const [animKey, setAnimKey] = useState(0);

    const activeSort = tabs[activeTab].sort;

    // CHANGED: every other useGetProducts argument stays undefined - this
    // widget only ever needs "N products, sorted this way", not
    // category/brand/price filtering. Each tab's sort value gets its own
    // cache entry, so flipping back to a previously-viewed tab is instant.
    const { data, isLoading, isError } = useGetProducts(
        undefined, // category
        undefined, // brand
        undefined, // tag
        undefined, // minPrice
        undefined, // maxPrice
        undefined, // stockStatus
        undefined, // isNew
        activeSort, // sort
        0,          // page
        SHOWCASE_SIZE, // size
        undefined,  // q
    );

    // CHANGED: axios.js's interceptor already unwraps the { success,
    // message, data } envelope, so `data` here IS the PageResponse
    // directly - same pattern as ProductsPage.jsx.
    const activeProducts = data?.content ?? [];

    const handleTabClick = (i) => {
        setActiveTab(i);
        setAnimKey((k) => k + 1);
    };

    return (
        <section className="relative mx-auto w-full rounded-xl max-w-7xl bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-6">
                    {tabs.map((tab, i) => (
                        <button
                            key={tab.label}
                            onClick={() => handleTabClick(i)}
                            className={`text-sm font-bold uppercase tracking-wide transition ${i === activeTab
                                ? "text-gray-900"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {/* CHANGED: was a dead href="#" anchor - now links to the full
                    products listing page, carrying over the same sort. */}
                <Link
                    to={`/products?sort=${activeSort}`}
                    className="text-xs font-medium text-gray-400 transition hover:text-primary"
                >
                    View All
                </Link>
            </div>

            {/* Product grid for the active tab — fades + lifts in on every switch */}
            <div
                key={animKey}
                className="grid w-full grid-cols-1 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 animate-fade-in"
            >
                {isLoading && (
                    <p className="col-span-full text-center text-sm text-gray-400">Loading…</p>
                )}

                {isError && (
                    <p className="col-span-full text-center text-sm text-danger">
                        Couldn't load products right now.
                    </p>
                )}

                {!isLoading && !isError && activeProducts.length === 0 && (
                    <p className="col-span-full text-center text-sm text-gray-400">
                        No products yet.
                    </p>
                )}

                {!isLoading && !isError && (
                    // CHANGED: key={`${activeTab}-${i}`} -> key={product.id}.
                    // Same reasoning as the Products.jsx fix - index-based
                    // keys risk mixing up local card state between products
                    // when the list changes.
                    activeProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductsTabs;