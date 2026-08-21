import React, { useCallback, useEffect, useState } from 'react';
import ProductCard from '../Main/ProductCard/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const ProductCarousel = ({ title, products = [], viewAllHref, isRelatedProductLoading }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", slidesToScroll: 1 });
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => {
            setCanPrev(emblaApi.canScrollPrev());
            setCanNext(emblaApi.canScrollNext());
        };
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        onSelect();
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi]);

    if (!products.length) return null;

    return (
        <section className="w-full rounded-xl bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    {title}
                </h2>
                {
                    isRelatedProductLoading && (
                        <p className="mb-4 text-sm text-gray-400">Loading products…</p>
                    )
                }

                <div className="flex items-center gap-3">
                    {
                        viewAllHref && (
                            <a
                                href={viewAllHref}
                                className="text-xs font-medium text-gray-400 transition hover:text-primary"
                            >
                                View All
                            </a>
                        )
                    }

                    {/* Prev / Next */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollPrev}
                            disabled={!canPrev}
                            aria-label="Previous products"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={scrollNext}
                            disabled={!canNext}
                            aria-label="Next products"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel viewport */}
            <div className="mt-4 overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                    {
                        products.map((product, i) => (
                            <div
                                key={i}
                                // Slide width controls how many cards are visible per breakpoint:
                                // 1 on mobile → 2 on sm → 3 on md → 4 on lg → 5 on xl
                                // Gap is subtracted so slides don't bleed outside the viewport.
                                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(33.333%-11px)] lg:flex-[0_0_calc(25%-12px)] xl:flex-[0_0_calc(20%-13px)]"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;