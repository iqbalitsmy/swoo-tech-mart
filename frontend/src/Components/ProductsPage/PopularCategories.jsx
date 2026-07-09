import React, { useCallback, useEffect, useState } from 'react';
import SubcategoryCard from '../Shared/Main/ProductCard/SubcategoryCard';
import cellPhoneSmallImg from "../../assets/promo-section/iphone.png";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const subcategories = [
    { image: cellPhoneSmallImg, name: "iPhone (iOS)", itemCount: 74 },
    { image: cellPhoneSmallImg, name: "Android", itemCount: 35 },
    { image: cellPhoneSmallImg, name: "5G Support", itemCount: 12 },
    { image: cellPhoneSmallImg, name: "Apple Tablets", itemCount: 22 },
    { image: cellPhoneSmallImg, name: "Smartphone Chargers", itemCount: 33 },
    { image: cellPhoneSmallImg, name: "Gaming", itemCount: 9 },
    { image: cellPhoneSmallImg, name: "Xiaomi", itemCount: 52 },
    { image: cellPhoneSmallImg, name: "Accessories", itemCount: 29 },
    { image: cellPhoneSmallImg, name: "Samsung Tablets", itemCount: 26 },
    { image: cellPhoneSmallImg, name: "eReader", itemCount: 5 },
];

// Splits the flat list into pairs so each Embla slide is one column
// of 2 cards — clicking prev/next moves exactly one column at a time,
// while 4 columns stay visible simultaneously on desktop.
function pairItems(arr) {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
        pairs.push(arr.slice(i, i + 2));
    }
    return pairs;
}

const PopularCategories = () => {
    const columns = pairItems(subcategories); // each column = [top card, bottom card]

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        slidesToScroll: 1, // move exactly one column per click
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

    return (
        <div className="w-full rounded-xl bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between pb-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    Popular Categories
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={scrollPrev}
                        disabled={!canPrev}
                        aria-label="Previous categories"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={scrollNext}
                        disabled={!canNext}
                        aria-label="Next categories"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Carousel — each slide is one column (2 stacked cards).
                flex-basis keeps 4 columns visible at once on md+,
                2 on sm, 1 on mobile. One column scrolls per arrow click. */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-x-8">
                    {
                        columns.map((pair, colIndex) => (
                            <div
                                key={colIndex}
                                className="
                                min-w-0
                                flex-[0_0_calc(100%-0px)]
                                sm:flex-[0_0_calc(50%-16px)]
                                md:flex-[0_0_calc(25%-24px)]
                                flex flex-col gap-4
                            "
                            >
                                {
                                    pair.map((sub) => (
                                        <SubcategoryCard key={sub.name} {...sub} />
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;