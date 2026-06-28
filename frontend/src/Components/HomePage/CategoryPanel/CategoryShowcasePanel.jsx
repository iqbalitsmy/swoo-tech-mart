import React from "react";

/**
 * Single subcategory row item — circular thumbnail + name + item count.
 */
function SubcategoryItem({ image, name, itemCount }) {
    return (
        <a href="#" className="group flex flex-col items-center gap-2 text-center">
            <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-100 transition group-hover:bg-gray-200">
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover" />
                ) : (
                    <span className="text-[10px] font-medium text-gray-400">Photo</span>
                )}
            </span>
            <span className="text-sm font-semibold text-gray-900">{name}</span>
            <span className="text-xs text-gray-400">{itemCount} Items</span>
        </a>
    );
}

export default function CategoryShowcasePanel({
    title,
    bannerImage,
    bannerOverlayLines = [],
    bannerHref = "#",
    subcategories = [],
}) {
    const lastLineIndex = bannerOverlayLines.length - 1;

    return (
        <div className="flex w-full flex-col rounded-xl bg-white p-5 shadow-sm">
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

            {/* Promo banner */}
            <a
                href={bannerHref}
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

                {bannerOverlayLines.length > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
                )}

                {bannerOverlayLines.length > 0 && (
                    <div className="absolute left-4 top-4 flex flex-col text-white">
                        {bannerOverlayLines.map((line, i) => (
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
                        ))}
                    </div>
                )}
            </a>

            {/* Divider */}
            <div className="mt-4 border-t border-gray-100" />

            {/* Subcategory grid */}
            <div className="mt-5 grid grid-cols-2 gap-y-6">
                {subcategories.map((sub) => (
                    <SubcategoryItem key={sub.name} {...sub} />
                ))}
            </div>
        </div>
    );
}