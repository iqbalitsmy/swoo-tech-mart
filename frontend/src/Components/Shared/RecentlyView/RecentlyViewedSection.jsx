import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCardHorizontal from "../../Shared/Main/ProductCard/ProductCardHorizontal";
import productImg from "../../../assets/products/laptop.jpg";

const recentlyViewed = [
    {
        reviews: 152,
        title: "BOSO 2 Wireless On Ear Headphone",
        price: 359.0,
        rating: 3.5,
        oldPrice: null,
        tags: ["Free Shipping", "Free Gift"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["best-seller"],
        wishlist: true,
        addToCard: false,
    },
    {
        reviews: 152,
        title: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
        price: 569.0,
        rating: 4,
        oldPrice: 759.0,
        tags: ["Free Shipping"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["best-seller", "popular"],
        wishlist: true,
        addToCard: true,
    },
    {
        reviews: 8,
        title: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
        price: 1729.0,
        rating: 5,
        oldPrice: 1799.0,
        tags: ["Free Shipping"],
        stock: "out",
        thumbnail: productImg,
        categoryTags: ["best-seller"],
        wishlist: true,
        addToCard: false,
    },
    {
        reviews: null,
        title: "Oppto Watch Series 8 GPS + Cellular Stainless Steel Case with Milanese Loop",
        price: 9.0,
        rating: 3.5,
        oldPrice: null,
        tags: ["$2.99 Shipping"],
        stock: "preorder",
        thumbnail: productImg,
        categoryTags: ["best-seller", "new-in"],
        wishlist: false,
        addToCard: false,
    },
    {
        reviews: 21,
        title: "Vexa Smart Air Fryer 6.5L Digital Touchscreen",
        price: 89.0,
        rating: 4.5,
        oldPrice: 119.0,
        tags: ["Free Shipping"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["new-in"],
        wishlist: true,
        addToCard: false,
    },
    {
        reviews: 4,
        title: "Norra Mechanical Keyboard 75% Hot-Swap RGB",
        price: 79.0,
        rating: 4,
        oldPrice: null,
        tags: ["Free Gift"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["new-in"],
        wishlist: true,
        addToCard: false,
    },
    {
        reviews: 13,
        title: "Plyno 4K Action Camera with Waterproof Case",
        price: 149.0,
        rating: 3.5,
        oldPrice: 189.0,
        tags: ["Free Shipping"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["new-in", "popular"],
        wishlist: false,
        addToCard: true,
    },
    {
        reviews: null,
        title: "Hexel Smart Door Lock with Fingerprint + App",
        price: 129.0,
        rating: 4,
        oldPrice: null,
        tags: ["$4.99 Shipping"],
        stock: "preorder",
        thumbnail: productImg,
        categoryTags: ["new-in"],
        wishlist: true,
        addToCard: false,
    },
    {
        reviews: 312,
        title: "Bravo Insulated Water Bottle 1L Stainless Steel",
        price: 24.0,
        rating: 5,
        oldPrice: 32.0,
        tags: ["Free Shipping"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["popular"],
        wishlist: true,
        addToCard: false,
    },
    {
        reviews: 88,
        title: "Quira Wireless Charging Pad 3-in-1 Stand",
        price: 39.0,
        rating: 4.5,
        oldPrice: null,
        tags: ["Free Gift"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["popular"],
        wishlist: true,
        addToCard: false,
    },
    {
        reviews: 6,
        title: "Fenro Desk Lamp with Wireless Charger Base",
        price: 45.0,
        rating: 4,
        oldPrice: 59.0,
        tags: ["Free Shipping"],
        stock: "out",
        thumbnail: productImg,
        categoryTags: ["popular"],
        wishlist: false,
        addToCard: true,
    },
    {
        reviews: 47,
        title: "Liso Ceramic Cookware Set 10-Piece",
        price: 199.0,
        rating: 4.5,
        oldPrice: null,
        tags: ["$5.99 Shipping"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["popular"],
        wishlist: false,
        addToCard: true,
    },
];

const RecentlyViewedSection = () => {
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

    return (
        <section className="mx-auto w-full max-w-7xl rounded-xl bg-white p-6 shadow-sm">
            {/* Header with arrows in the top-right, matching the BestSellerCarousel pattern */}
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

            {/* Carousel viewport */}
            <div className="mt-4 overflow-hidden" ref={emblaRef}>
                <div className="flex gap-3">
                    {
                        recentlyViewed.map((product, i) => (
                            <div
                                key={i}
                                // flex-basis controls visible card count per breakpoint:
                                // 1 card on mobile, 2 on sm, 3 on md+ — gap is
                                // subtracted from each slide width so cards don't overlap.
                                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.333%-8px)]"
                            >
                                <ProductCardHorizontal product={product} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default RecentlyViewedSection;