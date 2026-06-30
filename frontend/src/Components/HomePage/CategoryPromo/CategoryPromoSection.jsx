import React from "react";
import ProductCard from "../../Shared/Main/ProductCard/ProductCard";
import SubcategoryCard from "../../Shared/Main/ProductCard/SubcategoryCard";


const CategoryPromoSection = ({
    title,
    bannerImage,
    bannerHeading,
    bannerSubtext,
    bannerCta = "Shop now",
    bannerHref = "#",
    bannerVariant = "light",
    subcategories = [],
    products = [],
}) => {
    const isDark = bannerVariant === "dark";

    return (
        <section className="w-full rounded-xl bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    {title}
                </h2>
                <a
                    href="#"
                    className="text-xs font-medium text-gray-400 transition hover:text-primary"
                >
                    View All
                </a>
            </div>

            {/* Banner + subcategory grid */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                {/* Promo banner */}
                <a
                    href={bannerHref}
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
                </a>

                {/* Subcategory mini-grid */}
                <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-4 self-start sm:grid-cols-3">
                    {
                        subcategories.map((sub) => (
                            <SubcategoryCard key={sub.name} {...sub} />
                        ))
                    }
                </div>
            </div>

            {/* Divider */}
            <div className="mt-5 border-t border-gray-100" />

            {/* Product row — static grid, no scrolling */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {
                    products.map((product, i) => (
                        <ProductCard key={i} product={product} />
                    ))
                }
            </div>
        </section>
    );
}

export default CategoryPromoSection;