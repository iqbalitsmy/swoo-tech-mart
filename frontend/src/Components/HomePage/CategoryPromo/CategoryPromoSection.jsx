import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../Shared/Main/ProductCard/ProductCard";
import SubcategoryCard from "../../Shared/Main/ProductCard/SubcategoryCard";


const CategoryPromoSection = ({
    title,
    bannerImage,
    bannerHeading,
    bannerSubtext,
    bannerCta = "Shop now",
    // CHANGED: bannerHref renamed to `href` and now also drives the header's
    // "View All" link - previously that was a dead href="#" regardless of
    // what bannerHref was set to, so the two links could never actually
    // point anywhere different anyway.
    href = "#",
    bannerVariant = "light",
    subcategories = [],
    products = [],
    // CHANGED: new - products come from a real API call now (see
    // CategoryPromoSections.jsx), so this section needs to render
    // loading/error states instead of assuming `products` is always
    // immediately ready like the old static array was.
    isLoading = false,
    isError = false,
}) => {

    const isDark = bannerVariant === "dark";

    return (
        <section className="w-full rounded-xl bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    {title}
                </h2>
                {/* CHANGED: was a dead href="#" anchor - now a real link. */}
                <Link
                    to={href}
                    className="text-xs font-medium text-gray-400 transition hover:text-primary"
                >
                    View All
                </Link>
            </div>

            {/* Banner + subcategory grid */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                {/* Promo banner */}
                {/* CHANGED: was <a href={bannerHref}> - now uses the same
                    `href` prop as the "View All" link above, via react-router's Link. */}
                <Link
                    to={href}
                    className={`relative flex h-36 w-full shrink-0 items-center overflow-hidden rounded-lg sm:w-2/5 ${isDark ? "bg-gray-900" : "bg-gray-100"
                        }`}
                >
                    {
                        bannerImage && (
                            <img
                                src={bannerImage}
                                alt={bannerHeading}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        )
                    }

                    <div className="relative z-10 flex flex-col gap-2 p-5">
                        <h3
                            className={`text-xl font-bold leading-tight max-w-1/2 ${isDark ? "text-white" : "text-gray-900"
                                }`}
                        >
                            {bannerHeading}
                        </h3>
                        {
                            bannerSubtext && (
                                <p
                                    className={`text-xs ${isDark ? "text-gray-300" : "text-gray-500"
                                        }`}
                                >
                                    {bannerSubtext}
                                </p>
                            )
                        }
                        <span
                            className={`mt-1 inline-block w-fit rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${isDark
                                ? "bg-white text-gray-900"
                                : "bg-gray-900 text-white"
                                }`}
                        >
                            {bannerCta}
                        </span>
                    </div>
                </Link>

                {/* Subcategory mini-grid — stays static, per your instruction */}
                <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-4 self-start sm:grid-cols-3">
                    {
                        subcategories.map((sub) => (
                            <Link
                                to={`/products?category=${sub.slug}`}
                                key={sub.slug}
                            >
                                <SubcategoryCard {...sub} />
                            </Link>
                        ))
                    }
                </div>
            </div>

            {/* Divider */}
            <div className="mt-5 border-t border-gray-100" />

            {/* Product row — static grid, no scrolling */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {/* CHANGED: added loading/error/empty states - the old static
                    array never needed these since it was always "ready". */}
                {isLoading && (
                    <p className="col-span-full text-center text-sm text-gray-400">Loading…</p>
                )}

                {isError && (
                    <p className="col-span-full text-center text-sm text-danger">
                        Couldn't load products right now.
                    </p>
                )}

                {!isLoading && !isError && products.length === 0 && (
                    <p className="col-span-full text-center text-sm text-gray-400">
                        No products yet.
                    </p>
                )}

                {!isLoading && !isError && (
                    // CHANGED: key={i} -> key={product.id} - same reasoning
                    // as Products.jsx and ProductsTabs.jsx: index keys risk
                    // mixing up a card's local state (wishlist/cart toggle)
                    // between products once the underlying list changes.
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </section>
    );
}

export default CategoryPromoSection;