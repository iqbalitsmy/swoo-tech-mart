import React, { useState } from 'react';


const ProductDescription = ({ descriptions = [] }) => {
    const [expandedIds, setExpandedIds] = useState(() => new Set());

    const toggleExpanded = (id) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    if (!descriptions || descriptions.length === 0) return null;

    const sortedSections = [...descriptions].sort((a, b) => a.sortOrder - b.sortOrder);

    return (
        <div className="flex w-full flex-col gap-8 rounded-xl bg-white p-6 shadow-sm text-sm text-gray-700">
            {
                sortedSections.map((section) => {
                    const isExpanded = expandedIds.has(section.id);
                    const images = [...(section.images ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);

                    return (
                        <div key={section.id} className="flex flex-col gap-3">
                            {section.title && (
                                <h2 className="text-base font-bold text-gray-900">
                                    {section.title}
                                </h2>
                            )}

                            {section.body && (
                                <>
                                    <div
                                        className={`relative overflow-hidden leading-relaxed text-gray-600 transition-all duration-300 ${isExpanded ? "max-h-250" : "max-h-16"
                                            }`}
                                    >
                                        <p dangerouslySetInnerHTML={{ __html: section.body }} />
                                        {!isExpanded && (
                                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
                                        )}
                                    </div>

                                    <button
                                        onClick={() => toggleExpanded(section.id)}
                                        className="w-fit text-xs font-bold uppercase tracking-wide text-primary hover:text-primary-dark"
                                    >
                                        {isExpanded ? "Show Less" : "Show More"}
                                    </button>
                                </>
                            )}

                            {/* Images: 1 -> full-width hero style, 2 -> side-by-side
                                grid, 3+ -> a wrapping grid. No layout-hint field
                                exists on the API for this - it's a count-based
                                convention standing in for the old fixed
                                heroImage/gridImages split. */}
                            {images.length === 1 && (
                                <img
                                    src={images[0].url}
                                    alt={images[0].altText}
                                    className="w-full rounded-lg object-cover max-h-[80vh]"
                                />
                            )}
                            {images.length === 2 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {images.map((img) => (
                                        <img
                                            key={img.id}
                                            src={img.url}
                                            alt={img.altText}
                                            className="w-full rounded-lg object-cover"
                                        />
                                    ))}
                                </div>
                            )}
                            {images.length >= 3 && (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {images.map((img) => (
                                        <img
                                            key={img.id}
                                            src={img.url}
                                            alt={img.altText}
                                            loading='lazy'
                                            className="w-full rounded-lg object-cover"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ProductDescription;