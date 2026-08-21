import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCardHorizontal from "../../Shared/Main/ProductCard/ProductCardHorizontal";
import { useGetRecentlyViewProduct } from "@/hooks/useRecentlyView";

const RecentlyViewedSection = ({ excludeProductId }) => {
    const { data, isLoading, isError } = useGetRecentlyViewProduct();

    const products = (data ?? []).filter(
        (item) => item.id !== excludeProductId
    );

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        slidesToScroll: 1,
    });

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

    // Own gating logic — every consumer gets this for free.
    if (isLoading || isError || products.length === 0) return null;

    return (
        <section className="mx-auto w-full max-w-7xl rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    Recently Viewed
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={scrollPrev}
                        disabled={!canPrev}
                        aria-label="Previous items"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={scrollNext}
                        disabled={!canNext}
                        aria-label="Next items"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mt-4 overflow-hidden" ref={emblaRef}>
                <div className="flex gap-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)]"
                        >
                            <ProductCardHorizontal product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentlyViewedSection;