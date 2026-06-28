import React, { useCallback, useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft, MoreVertical, Laptop, Computer, Phone, Tablets, Camera, Tv, Refrigerator, TabletSmartphone } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import HeroCarousel from './HeroCarousel';

const categories = [
    {
        name: "Laptops",
        icon: <Laptop className="h-4 w-4 text-gray-400" />
    },
    {
        name: "PC and Computers",
        icon: <Computer className="h-4 w-4 text-gray-400" />
    },
    {
        name: "Cell Phones",
        icon: <Phone className="h-4 w-4 text-gray-400" />
    },
    {
        name: "Tablets",
        icon: <TabletSmartphone className="h-4 w-4 text-gray-400" />
    },
    {
        name: "Cameras",
        icon: <Camera className="h-4 w-4 text-gray-400" />
    },
    {
        name: "Refrigerator",
        icon: <Refrigerator className="h-4 w-4 text-gray-400" />
    },
    {
        name: "Television",
        icon: <Tv className="h-4 w-4 text-gray-400" />
    },
];


const CategoryHero = () => {
    return (
        <div className="container mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row">
            {/* Left: category sidebar */}
            <aside className="w-full shrink-0 rounded-xl bg-white shadow-sm sm:w-64">
                <p className="px-4 pt-4 text-xs font-bold uppercase tracking-wide text-danger">
                    Sale 40% off
                </p>
                <ul className="mt-2 divide-y divide-gray-100">
                    {
                        categories.map(({ name, icon }) => (
                            <li key={name}>
                                <a
                                    href="#"
                                    className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-primary"
                                >
                                    <span>{name}</span>
                                    <span>{icon}</span>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </aside>

            {/* Right: carousel */}
            <div className="flex-1">
                <HeroCarousel />
            </div>
        </div>
    );
};

export default CategoryHero;