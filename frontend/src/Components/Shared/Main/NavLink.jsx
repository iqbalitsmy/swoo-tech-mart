import React, { useState } from 'react';
import { Search, Menu, ShoppingCart, MapPin, ChevronDown, X, User, Heart } from "lucide-react";
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import logo from "../../../assets/logo/logo-icon.png";
// CHANGED: pull in auth state so the nav can react to login/logout.
import { useAuth } from '@/hooks/useAuth';
import { useGetWishlist, useWishlistCount } from '@/hooks/useWishlist';
import { useCartItemCount, useGetCart } from '@/hooks/useCart';

// CHANGED: desktop bottom links now map to real routes only.
// Removed: Today's Deals, Prime Video, Gift Cards, Sell, Registry,
// Customer Service — none have routes in the router.
const desktopLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Wishlist", to: "/wishlist" },
];

// CHANGED: mobile quick-links also reduced to real routes.
// Removed: Video, Amazon Basics, Livestreams, Best Sellers, New Releases
// — none have routes.
const mobileLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Cart", to: "/cart" },
    { label: "Orders", to: "/account/orders" },
];


const Avatar = ({ user, className = 'h-8 w-8 text-sm' }) => {
    if (user?.avatarUrl) {
        return (
            <img
                src={user.avatarUrl}
                alt={user.fullName}
                className={`rounded-full object-cover ${className}`}
            />
        );
    }
    const initial = user?.fullName?.trim()?.charAt(0)?.toUpperCase() || '?';
    return (
        <span
            className={`flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white ${className}`}
        >
            {initial}
        </span>
    );
};

const NavLink = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // CHANGED: NavLink now also owns the wishlist fetch, same reasoning as
    // cart — it's mounted everywhere, so this is the single GET /wishlist
    // for the whole session. ProductCard and any future WishlistPage just
    // read this cache.
    useGetCart();
    useGetWishlist();
    const cartCount = useCartItemCount();
    const wishlistCount = useWishlistCount();
    // CHANGED: shared logout handler - closes the mobile menu (if open) and
    // sends the user back to the home page after the session is cleared.
    const handleLogout = async () => {
        await logout();
        setMenuOpen(false);
        // navigate('/');
    };

    return (
        <nav className="w-full font-sans text-sm">
            {/* ---------- DESKTOP (lg and up) ---------- */}
            <div className="hidden lg:block">
                {/* Top row — sticky */}
                <div className="flex justify-between items-center gap-3 px-3 py-2 text-white bg-secondary sticky top-0 z-40">
                    {/* Logo */}
                    <Link to="/" className="flex justify-center items-center gap-1 shrink-0 pr-2">
                        <figure className="w-1/3 sm:w-auto">
                            <img src={logo} alt="Swoo Tech Mart" />
                        </figure>
                        <div>
                            <span className="block text-xl font-bold leading-none">SWOO</span>
                            <span className="block text-lg font-light leading-none -mt-[2]">TECH MART</span>
                        </div>
                    </Link>

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
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="min-w-0 flex-1 px-3 text-sm rounded-l-sm text-gray-900 outline-none bg-gray-200"
                        />
                        <button
                            aria-label="Search"
                            className="flex items-center justify-center rounded-r-sm bg-primary px-4 hover:bg-primary-dark"
                        >
                            <Search className="h-5 w-5 text-white" />
                        </button>
                    </div>

                    {/* Account dropdown */}
                    <div className="group relative hidden shrink-0 lg:block">
                        {/* CHANGED: trigger now goes to /account (not /login)
                            once signed in, and shows an avatar + first name
                            instead of "Hello, sign in". */}
                        <Link
                            to={isAuthenticated ? "/account" : "/login"}
                            className="flex items-center gap-2 rounded-sm border border-transparent px-2 py-1.5 leading-tight hover:border-white"
                        >
                            {isAuthenticated && <Avatar user={user} className="h-7 w-7 text-xs" />}
                            <span className="flex flex-col items-start">
                                <span className="text-xs">
                                    {isAuthenticated ? `Hello, ${user?.fullName?.split(' ')[0]}` : 'Hello, sign in'}
                                </span>
                                <span className="flex items-center gap-1 text-sm font-bold">
                                    Account
                                    <ChevronDown className="h-3 w-3" />
                                </span>
                            </span>
                        </Link>

                        {/* Hover bridge — keeps the dropdown open when the
                            cursor moves from the trigger down into the panel */}
                        <div className="absolute right-0 top-full h-2 w-60" />

                        <div className="invisible absolute right-0 top-full z-50 w-60 translate-y-1 rounded-sm
                            border border-gray-200 bg-white p-4 text-gray-900 opacity-0 shadow-xl
                            transition-all duration-150
                            group-hover:visible group-hover:translate-y-2 group-hover:opacity-100
                            group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100"
                        >
                            {/* CHANGED: signed-in users see a profile summary
                                instead of the Sign In / Sign Up CTA. */}
                            {
                                isAuthenticated ? (
                                    <div className="flex items-center gap-2 pb-1">
                                        <Avatar user={user} className="h-9 w-9 text-sm" />
                                        <div className="min-w-0 leading-tight">
                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                {user.fullName}
                                            </p>
                                            <p className="truncate text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex gap-2">
                                            <Link
                                                to="/login"
                                                className="flex-1 rounded bg-primary py-1.5 text-center text-sm font-semibold text-white hover:bg-primary-dark"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="flex-1 rounded border border-gray-300 py-1.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign Up
                                            </Link>
                                        </div>
                                        <p className="mt-2 text-center text-xs text-gray-500">
                                            New customer?{" "}
                                            <Link to="/signup" className="text-primary hover:underline">
                                                Start here
                                            </Link>
                                        </p>
                                    </>
                                )
                            }

                            <hr className="my-3 border-gray-200" />

                            {/* Account-related links — all have real routes */}
                            <div className="flex flex-col">
                                <Link to="/account" className="rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Your Account</Link>
                                <Link to="/account/orders" className="rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Your Orders</Link>
                                <Link to="/wishlist" className="rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Your Wishlist</Link>
                                <Link to="/cart" className="rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Your Cart</Link>
                                {/* CHANGED: logout button, only shown when signed in. */}
                                {
                                    isAuthenticated && (
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="mt-1 rounded px-2 py-1.5 text-left text-sm font-medium text-danger hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/wishlist"
                        aria-label="Wishlist"
                        className="flex shrink-0 items-end gap-1 rounded-sm border border-transparent px-2 py-1.5 hover:border-white"
                    >
                        <span className="relative">
                            <Heart className="h-7 w-7" />
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {wishlistCount}
                            </span>
                        </span>
                    </Link>

                    <Link to="/cart" className="flex shrink-0 items-end gap-1 rounded-sm border border-transparent px-2 py-1.5 hover:border-white">
                        <span className="relative">
                            <ShoppingCart className="h-8 w-8" />
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        </span>
                        <span className="text-sm font-bold">Cart</span>
                    </Link>
                </div>

                {/* Bottom row — real routes only */}
                <div className="flex items-center gap-4 bg-primary-dark px-3 py-1.5 text-white sticky top-[52px] z-30">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="flex items-center gap-1.5 rounded-sm border border-transparent px-2 py-1 text-sm font-medium hover:border-white"
                    >
                        <Menu className="h-4 w-4" />
                        All
                    </button>
                    {
                        desktopLinks.map(({ label, to }) => (
                            <RouterNavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `rounded-sm border px-1.5 py-1 text-sm transition ${isActive
                                        ? "border-white font-semibold"
                                        : "border-transparent hover:border-white"
                                    }`
                                }
                            >
                                {label}
                            </RouterNavLink>
                        ))
                    }
                </div>
            </div>

            {/* ---------- MOBILE (below lg) ---------- */}
            <div className="lg:hidden sticky top-0 z-40 bg-white shadow-sm">
                {/* Top row */}
                <div className="flex items-center justify-between px-3 py-2.5">
                    <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                        <Menu className="h-6 w-6" />
                    </button>

                    <Link to="/" className="flex justify-center gap-1 shrink-0 items-end pr-2">
                        <figure className="w-auto min-w-10">
                            <img src={logo} alt="Swoo Tech Mart" />
                        </figure>
                        <div>
                            <span className="block text-xl font-bold leading-none">SWOO</span>
                            <span className="block text-lg font-light leading-none mt-[-2]">TECH MART</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        {/* CHANGED: shows the avatar (linking to /account)
                            instead of the generic sign-in icon once logged in. */}
                        <Link
                            to={isAuthenticated ? "/account" : "/login"}
                            aria-label={isAuthenticated ? "Your account" : "Sign in"}
                        >
                            {isAuthenticated ? (
                                <Avatar user={user} className="h-6 w-6 text-[10px]" />
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </Link>
                        <Link to="/wishlist" className="relative" aria-label="Wishlist">
                            <Heart className="h-6 w-6" />
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {wishlistCount}
                            </span>
                        </Link>
                        <Link to="/cart" className="relative" aria-label="Cart">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Search row */}
                <div className="flex h-10 items-stretch px-3 pb-2.5">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="min-w-0 flex-1 rounded-l-sm px-3 text-sm text-gray-900 bg-gray-200 outline-none"
                    />
                    <button
                        aria-label="Search"
                        className="flex items-center justify-center rounded-r-sm bg-primary px-4 hover:bg-primary-dark"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </button>
                </div>

                {/* Quick links — real routes only */}
                <div className="scrollbar-none flex gap-5 overflow-auto whitespace-nowrap bg-primary-dark px-3 py-2.5 text-sm text-white">
                    {mobileLinks.map(({ label, to }) => (
                        <RouterNavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `shrink-0 transition ${isActive ? "font-semibold underline" : "hover:underline"}`
                            }
                        >
                            {label}
                        </RouterNavLink>
                    ))}
                </div>
            </div>

            {/* ---------- Slide-out menu ---------- */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
                    <div className="relative flex h-full w-80 max-w-[85%] flex-col overflow-y-auto bg-white text-gray-900 shadow-xl">
                        <div className="flex items-center gap-2 bg-secondary px-4 py-4 text-white">
                            {/* CHANGED: header shows avatar + first name when
                                signed in, generic icon + "Hello, sign in" otherwise. */}
                            {isAuthenticated ? (
                                <>
                                    <Avatar user={user} className="h-8 w-8 text-sm" />
                                    <span className="text-lg font-bold">Hello, {user?.fullName?.split(' ')[0]}</span>
                                </>
                            ) : (
                                <>
                                    <User className="h-8 w-8" />
                                    <span className="text-lg font-bold">Hello, sign in</span>
                                </>
                            )}
                            <button onClick={() => setMenuOpen(false)} className="ml-auto" aria-label="Close menu">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Account links */}
                        <div className="border-b border-gray-200 px-4 py-3">
                            <h3 className="mb-2 text-base font-bold">My Account</h3>
                            {[
                                { label: "Account Info", to: "/account" },
                                { label: "My Orders", to: "/account/orders" },
                                { label: "My Address", to: "/account/address" },
                                { label: "Change Password", to: "/account/password" },
                            ].map(({ label, to }) => (
                                <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                                    className="block py-2 text-sm hover:text-primary hover:underline">
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Shop links */}
                        <div className="border-b border-gray-200 px-4 py-3">
                            <h3 className="mb-2 text-base font-bold">Shop</h3>
                            {[
                                { label: "All Products", to: "/products" },
                                { label: "Wishlist", to: "/wishlist" },
                                { label: "Cart", to: "/cart" },
                            ].map(({ label, to }) => (
                                <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                                    className="block py-2 text-sm hover:text-primary hover:underline">
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Auth */}
                        <div className="px-4 py-3">
                            {/* CHANGED: signed-in users get a single full-width
                                Logout button instead of the Sign In / Sign Up pair. */}
                            {isAuthenticated ? (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full rounded border border-gray-300 py-2 text-center text-sm font-semibold text-danger hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <Link to="/login" onClick={() => setMenuOpen(false)}
                                        className="flex-1 rounded bg-primary py-2 text-center text-sm font-semibold text-white hover:bg-primary-dark">
                                        Sign In
                                    </Link>
                                    <Link to="/signup" onClick={() => setMenuOpen(false)}
                                        className="flex-1 rounded border border-gray-300 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-100">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavLink;