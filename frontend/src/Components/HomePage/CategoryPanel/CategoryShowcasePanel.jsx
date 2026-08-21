import React from "react";
import SubcategoryItem from "./SubcategoryItem";
import { Link } from "react-router-dom";


export default function CategoryShowcasePanel({
    title,
    bannerImage,
    bannerOverlayLines = [],
    bannerHref = "#",
    subcategories = [],
    isSubcategoriesLoading = false,
}) {
    const lastLineIndex = bannerOverlayLines.length - 1;

    return (
        <div className="flex w-full flex-col rounded-xl bg-white p-5 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    {title}
                </h2>
                {/* CHANGED: was a dead href="#" anchor - now links to this
                    panel's own category listing, same target as the banner. */}
                <Link
                    to={bannerHref}
                    className="text-xs font-medium text-gray-400 transition hover:text-primary"
                >
                    View All
                </Link>
            </div>

            {/* Promo banner */}
            {/* CHANGED: was <a href={bannerHref}> - now react-router's Link. */}
            <Link
                to={bannerHref}
                className="relative mt-4 block h-40 w-full overflow-hidden rounded-lg bg-gray-900"
            >
                {bannerImage ? (
                    <img
                        src={bannerImage}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                        <span className="text-xs font-medium text-gray-400">
                            Banner photo
                        </span>
                    </div>
                )}

                {
                    bannerOverlayLines.length > 0 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
                    )
                }

                {bannerOverlayLines.length > 0 && (
                    <div className="absolute left-4 top-4 flex flex-col text-white">
                        {
                            bannerOverlayLines.map((line, i) => (
                                <span
                                    key={i}
                                    className={
                                        i === lastLineIndex
                                            ? "text-lg font-bold leading-tight"
                                            : "text-sm font-medium uppercase leading-tight opacity-90"
                                    }
                                >
                                    {line}
                                </span>
                            ))
                        }
                    </div>
                )}
            </Link>

            {/* Divider */}
            <div className="mt-4 border-t border-gray-100" />

            {/* Subcategory grid */}
            <div className="mt-5 grid grid-cols-2 gap-y-6">
                {/* CHANGED: added a loading state - real data can be "not
                    ready yet" in a way the old static array never was. */}
                {
                    isSubcategoriesLoading ? (
                        <p className="col-span-full text-xs text-gray-400">Loading…</p>
                    ) : (
                        subcategories.map((sub) => (
                            <Link
                                key={sub.slug}
                                to={`/products/?category=${sub.slug}`}
                            >
                                <SubcategoryItem {...sub} />
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    );
}