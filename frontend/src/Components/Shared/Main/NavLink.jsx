import React, { useState } from 'react';
import { Search, Menu, ShoppingCart, MapPin, ChevronDown, X, User } from "lucide-react";
import { Link } from 'react-router-dom';
import logo from "../../../assets/logo/logo-icon.png"

const NavLink = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [category, setCategory] = useState("All");

    const categories = ["All", "Electronics", "Fashion", "Home", "Books", "Toys"];

    const desktopLinks = [
        "Today's Deals",
        "Prime Video",
        "Gift Cards",
        "Sell",
        "Registry",
        "Customer Service",
    ];

    const mobileLinks = ["Video", "Deals", "Amazon Basics", "Livestreams", "Books", "Best Sellers", "New Releases"];

    return (
        <nav className="w-full font-sans text-sm">
            {/* ---------- DESKTOP (lg and up) ---------- */}
            <div className="hidden lg:block">
                {/* Top row */}
                <div className="flex justify-between items-center gap-3 px-3 py-2 text-white bg-secondary">
                    {/* Logo */}
                    <a href="/" className="flex justify-center items-center gap-1 shrink-0 pr-2">
                        <figure className='w-1/3 sm:w-auto'>
                            <img className='' src={logo} alt="swoo tech mart" />
                        </figure>
                        <div>
                            <span className="block text-xl font-bold leading-none">SWOO</span>
                            <span className="block text-lg font-light leading-none -mt-[2]">
                                TECH MART
                            </span>
                        </div>
                    </a>

                    {/* Deliver to */}
                    <button className="hidden shrink-0 items-start gap-1 rounded-sm border border-transparent px-2 py-1.5 text-left hover:border-white xl:flex">
                        <MapPin className="mt-1.5 h-4 w-4 text-white" />
                        <span className="leading-tight">
                            <span className="block text-xs text-white">Deliver to</span>
                            <span className="block text-sm font-bold text-white">Bangladesh</span>
                        </span>
                    </button>

                    {/* Search bar */}
                    <div className="flex h-10 flex-1 items-stretch rounded-sm">
                        {/* <button className="flex items-center gap-1 rounded-l-sm border-r border-gray-100 bg-primary px-3 text-xs font-medium text-white hover:bg-primary-dark">
                            {category}
                            <ChevronDown className="h-3 w-3" />
                        </button> */}
                        <input
                            type="text"
                            placeholder="Search Amazon"
                            className="min-w-0 flex-1 px-3 text-sm rounded-l-sm text-gray-900 outline-none bg-gray-200"
                        />
                        <button
                            aria-label="Search"
                            className="flex items-center justify-center rounded-r-sm bg-primary px-4 hover:bg-primary-dark"
                        >
                            <Search className="h-5 w-5 text-white" />
                        </button>
                    </div>

                    {/* Language */}
                    <button className="text-white hidden shrink-0 items-center gap-1 rounded-sm border border-transparent px-2 py-1.5 hover:border-white xl:flex">
                        <span className="text-base leading-none">🇺🇸</span>
                        <span className="font-bold">EN</span>
                        <ChevronDown className="h-3 w-3" />
                    </button>

                    {/* Account */}
                    <button className="flex shrink-0 flex-col items-start rounded-sm border border-transparent px-2 py-1.5 leading-tight hover:border-white">
                        <span className="text-xs">Hello, sign in</span>
                        <span className="flex items-center gap-1 text-sm font-bold">
                            Account &amp; Lists
                            <ChevronDown className="h-3 w-3 fill-gray-800" />
                        </span>
                    </button>

                    {/* Returns */}
                    <button className="hidden shrink-0 flex-col items-start rounded-sm border border-transparent px-2 py-1.5 leading-tight hover:border-white md:flex">
                        <span className="text-xs">Returns</span>
                        <span className="text-sm font-bold">&amp; Orders</span>
                    </button>

                    {/* Cart */}
                    <button className="flex shrink-0 items-end gap-1 rounded-sm border border-transparent px-2 py-1.5 hover:border-white">
                        <span className="relative">
                            <ShoppingCart className="h-8 w-8" />
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                0
                            </span>
                        </span>
                        <span className="text-sm font-bold">Cart</span>
                    </button>
                </div>

                {/* Bottom row */}
                <div className="flex items-center gap-4 bg-primary-dark px-3 py-1.5 text-white">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="flex items-center gap-1.5 rounded-sm border border-transparent px-2 py-1 text-sm font-medium hover:border-white"
                    >
                        <Menu className="h-4 w-4" />
                        All
                    </button>
                    {
                        desktopLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="rounded-sm border border-transparent px-1.5 py-1 text-sm hover:border-white"
                            >
                                {link}
                            </a>
                        ))
                    }
                </div>
            </div>

            {/* ---------- MOBILE (below lg) ---------- */}
            <div className="lg:hidden">
                {/* Top row */}
                <div className="flex items-center justify-between px-3 py-2.5">
                    <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Logo */}
                    <a href="#" className="flex justify-center gap-1 shrink-0 items-end pr-2">
                        <figure className='w-auto min-w-10'>
                            <img className='' src={logo} alt="Ecobazar" />
                        </figure>
                        <div>
                            <span className="block text-xl font-bold leading-none">SWOO</span>
                            <span className="block text-lg font-light leading-none mt-[-2] ">
                                TECH MART
                            </span>
                        </div>
                    </a>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm" aria-label="Sign in">
                            Sign in
                            <ChevronDown className="hidden h-3 w-3" />
                            <User className="h-5 w-5" />
                        </button>
                        <button className="relative" aria-label="Cart">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                0
                            </span>
                        </button>
                    </div>
                </div>

                {/* Search row */}
                <div className="flex h-10 items-stretch px-3 pb-2.5">
                    <input
                        type="text"
                        placeholder="Search Amazon"
                        className="min-w-0 flex-1 rounded-l-sm px-3 text-sm text-gray-900 bg-gray-200 outline-none"
                    />
                    <button
                        aria-label="Search"
                        className="flex items-center justify-center rounded-r-sm bg-primary px-4 hover:bg-primary-dark"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </button>
                </div>

                {/* Quick links row */}
                <div className="scrollbar-none flex gap-5 overflow-x-auto whitespace-nowrap bg-primary-dark px-3 py-2.5 text-sm text-white">
                    {
                        mobileLinks.map((link) => (
                            <a key={link} href="#" className="shrink-0 hover:underline">
                                {link}
                            </a>
                        ))
                    }
                </div>

                {/* Deliver to row */}
                <button className="flex w-full items-center gap-1.5 bg-primary-dark px-3 py-2 text-sm text-gray-200">
                    <MapPin className="h-4 w-4" />
                    Deliver to <span className="font-bold">Bangladesh</span>
                    <ChevronDown className="h-3 w-3" />
                </button>
            </div>

            {/* ---------- Slide-out menu (shared) ---------- */}
            {
                menuOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setMenuOpen(false)}
                        />
                        <div className="relative flex h-full w-80 max-w-[85%] flex-col overflow-y-auto bg-white text-gray-900 shadow-xl">
                            <div className="flex items-center gap-2 bg-secondary px-4 py-4 text-white">
                                <User className="h-8 w-8" />
                                <span className="text-lg font-bold">Hello, sign in</span>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="ml-auto"
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="border-b border-gray-200 px-4 py-3">
                                <h3 className="mb-2 text-lg font-bold">Trending</h3>
                                {
                                    ["Best Sellers", "New Releases", "Movers & Shakers"].map((item) => (
                                        <a
                                            key={item}
                                            href="#"
                                            className="block py-2 text-sm hover:underline"
                                        >
                                            {item}
                                        </a>
                                    ))
                                }
                            </div>

                            <div className="border-b border-gray-200 px-4 py-3">
                                <h3 className="mb-2 text-lg font-bold">Digital Content & Devices</h3>
                                {["Prime Video", "Amazon Basics", "Livestreams"].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="block py-2 text-sm hover:underline"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>

                            <div className="border-b border-gray-200 px-4 py-3">
                                <h3 className="mb-2 text-lg font-bold">Shop by Category</h3>
                                {
                                    categories.map((item) => (
                                        <a
                                            key={item}
                                            href="#"
                                            className="block py-2 text-sm hover:underline"
                                        >
                                            {item}
                                        </a>
                                    ))
                                }
                            </div>

                            <div className="px-4 py-3">
                                <h3 className="mb-2 text-lg font-bold">Help & Settings</h3>
                                {
                                    ["Your Account", "Customer Service", "Sign in"].map(
                                        (item) => (
                                            <a
                                                key={item}
                                                href="#"
                                                className="block py-2 text-sm hover:underline"
                                            >
                                                {item}
                                            </a>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </nav>
    );
};

export default NavLink;