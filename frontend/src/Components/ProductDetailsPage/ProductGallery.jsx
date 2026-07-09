import React, { useState } from "react";

/**
 * Large main image + clickable thumbnail strip below it.
 * `images[0]` is shown first by default; clicking any thumbnail swaps
 * the main image without reloading anything else on the page.
 */
export default function ProductGallery({ images = [], isNew = false }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (images.length === 0) return null;

    return (
        <div className="flex w-full flex-col gap-4">
            {/* Main image */}
            <div className="relative flex h-96 w-full items-center justify-center rounded-xl bg-white">
                {isNew && (
                    <span className="absolute left-3 top-3 z-10 rounded bg-gray-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        New
                    </span>
                )}
                <img
                    src={images[activeIndex]}
                    alt="Product"
                    className="h-full w-full object-contain"
                />
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <div className="flex items-center gap-3">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`View image ${i + 1}`}
                            aria-pressed={i === activeIndex}
                            className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-white transition ${i === activeIndex
                                    ? "border-primary"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-contain" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}