import React from 'react';
import { Laptop, Computer, Phone, Camera, Tv, Refrigerator, TabletSmartphone } from "lucide-react";
import { Link } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';

const categories = [
    {
        name: "Laptops",
        href: "/products?category=laptops",
        icon: <Laptop className="h-4 w-4 text-gray-400" />,
    },
    {
        name: "PC and Computers",
        href: "/products?category=pc-and-computers",
        icon: <Computer className="h-4 w-4 text-gray-400" />,
    },
    {
        name: "Cell Phones",
        href: "/products?category=cell-phones",
        icon: <Phone className="h-4 w-4 text-gray-400" />,
    },
    {
        name: "Tablets",
        href: "/products?category=tablets",
        icon: <TabletSmartphone className="h-4 w-4 text-gray-400" />,
    },
    {
        name: "Cameras",
        href: "/products?category=cameras",
        icon: <Camera className="h-4 w-4 text-gray-400" />,
    },
    {
        name: "Refrigerator",
        href: "/products?category=refrigerator",
        icon: <Refrigerator className="h-4 w-4 text-gray-400" />,
    },
    {
        name: "Television",
        href: "/products?category=television",
        icon: <Tv className="h-4 w-4 text-gray-400" />,
    },
];

const CategoryHero = () => {
    return (
        <div className="container mx-auto flex max-w-7xl flex-col gap-4 pt-0 pb-6 lg:pt-6 sm:flex-row">
            {/* Left: category sidebar */}
            <aside className="w-full hidden lg:block shrink-0 rounded-xl bg-white shadow-sm sm:w-64">
                <p className="px-4 pt-4 text-xs font-bold uppercase tracking-wide text-danger">
                    Sale 40% off
                </p>
                <ul className="mt-2 divide-y divide-gray-100">
                    {categories.map(({ name, href, icon }) => (
                        <li key={name}>
                            <Link
                                to={href}
                                className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-primary"
                            >
                                <span>{name}</span>
                                <span>{icon}</span>
                            </Link>
                        </li>
                    ))}
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