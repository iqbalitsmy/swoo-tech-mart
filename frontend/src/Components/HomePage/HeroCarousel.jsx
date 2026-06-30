import React, { useCallback, useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, MoreVertical } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import ProductPlaceholder from './ProductPlaceholder';
import heroImg1 from '../../assets/hero/hero-image.png'

const slides = [
    {
        brand: "Bobolax",
        titleA: "Nutri 7-In-1",
        titleB: "Base On Formula 400g",
        desc: "Lorem ipsum dolor sit amet photo",
        panelColor: "bg-primary-light",
        image: heroImg1,
    },
    {
        brand: "Bobolax",
        titleA: "Stage 2",
        titleB: "Toddler Formula 800g",
        desc: "Lorem ipsum dolor sit amet photo",
        panelColor: "bg-primary",
        image: heroImg1,
    },
    {
        brand: "Bobolax",
        titleA: "Sensitive",
        titleB: "Gentle Care Formula 400g",
        desc: "Lorem ipsum dolor sit amet photo",
        panelColor: "bg-primary-dark",
        image: heroImg1,
    },
];

const HeroCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 300000, stopOnInteraction: false }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
        return () => emblaApi.off("select", onSelect);
    }, [emblaApi]);

    return (
        // CHANGED: reduced horizontal padding on mobile (px-4) and let it grow at sm —
        // this was already responsive-ish, kept as-is, just confirming it's fine.
        <div className="relative w-full overflow-hidden lg:rounded-xl bg-[#f1e9dc] px-4 py-6 sm:px-10">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {
                        slides.map((slide, i) => (
                            <div
                                key={i}
                                className="flex min-w-0 flex-[0_0_100%] flex-col items-center justify-center gap-6 text-center sm:flex-row sm:gap-10 sm:text-left"
                            >
                                <div
                                    className="w-full max-w-sm px-2 sm:w-auto sm:max-w-xs sm:px-0"
                                >
                                    <p className="text-sm font-semibold text-gray-800">{slide.brand}</p>
                                    <h2 className="mt-1 text-xl font-bold leading-snug text-gray-900 sm:text-2xl md:text-3xl">
                                        {slide.titleA}{" "}
                                        <span className="font-normal">{slide.titleB}</span>
                                    </h2>
                                    <p className="mt-3 text-sm text-gray-500">{slide.desc}</p>
                                    <button className="mt-5 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-primary-dark">
                                        Shop now
                                    </button>
                                </div>

                                <ProductPlaceholder image={slide.image} title={slide.titleA} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow hover:bg-white sm:flex"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow hover:bg-white sm:flex"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-4 flex justify-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2 w-2 rounded-full transition ${i === selectedIndex ? "bg-primary" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;