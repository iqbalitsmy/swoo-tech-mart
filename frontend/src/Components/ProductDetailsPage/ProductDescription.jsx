import React, { useState } from 'react';


const ProductDescription = ({ description }) => {
    const [expanded, setExpanded] = useState(false);

    if (!description) return null;

    const {
        intro,
        heroImage,
        heroCaption,
        manufacturerBody,
        gridImages = [],
        subSection,
    } = description;

    return (
        <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm text-sm text-gray-700">
            {/* 1. Intro paragraph */}
            {
                intro && (
                    <p
                        className="leading-relaxed text-gray-600"
                        dangerouslySetInnerHTML={{ __html: intro }}
                    />
                )
            }

            {/* 2. Wide hero image + caption */}
            {
                heroImage && (
                    <figure className="flex flex-col gap-2">
                        <img
                            src={heroImage.src}
                            alt={heroImage.alt}
                            className="w-full rounded-lg object-cover max-h-[80vh]"
                        />
                        {
                            heroCaption && (
                                <figcaption className="text-center text-xs italic text-gray-400">
                                    {heroCaption}
                                </figcaption>
                            )
                        }
                    </figure>
                )
            }

            {/* 3. From the manufacturer */}
            {
                manufacturerBody && (
                    <div className="flex flex-col gap-2">
                        <h2 className="text-base font-bold text-gray-900">
                            From the manufacturer
                        </h2>
                        <p
                            className="leading-relaxed text-gray-600"
                            dangerouslySetInnerHTML={{ __html: manufacturerBody }}
                        />
                    </div>
                )
            }

            {/* 4. Two-image grid — only renders when exactly 2 images are present */}
            {
                gridImages.length === 2 && (
                    <div className="grid grid-cols-2 gap-3">
                        {
                            gridImages.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full rounded-lg object-cover"
                                />
                            ))
                        }
                    </div>
                )
            }

            {/* 5. Collapsible sub-section */}
            {
                subSection && (
                    <div className="flex flex-col gap-2">
                        <h3 className="text-base font-bold text-gray-900">
                            {subSection.title}
                        </h3>

                        <div
                            className={`relative overflow-hidden leading-relaxed text-gray-600 transition-all duration-300 ${expanded ? "max-h-250" : "max-h-16"
                                }`}
                        >
                            <p dangerouslySetInnerHTML={{ __html: subSection.body }} />

                            {
                                !expanded && (
                                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
                                )
                            }
                        </div>

                        <button
                            onClick={() => setExpanded((prev) => !prev)}
                            className="w-fit text-xs font-bold uppercase tracking-wide text-primary hover:text-primary-dark"
                        >
                            {expanded ? "Show Less" : "Show More"}
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default ProductDescription;