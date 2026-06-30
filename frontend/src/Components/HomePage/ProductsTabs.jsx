import React, { useState } from "react";
import ProductCard from "../Shared/Main/ProductCard/ProductCard";
import productImg from "../../assets/products/laptop.jpg";


const tabs = [
    { label: "Best Seller", tag: "best-seller" },
    { label: "New In", tag: "new-in" },
    { label: "Popular", tag: "popular" },
];

// tab(s) it should show up under — a product can belong to more than one.
// `tags` (Free Shipping, Free Gift, etc.) stays untouched for ProductCard's
// own badge rendering, so the two concepts never collide.
const products = [
    {
        reviews: 152,
        title: "BOSO 2 Wireless On Ear Headphone",
        price: 359.0,
        rating: 3.5,
        oldPrice: null,
        save: null,
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
        save: 199.0,
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
        save: 59.0,
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
        save: null,
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
        save: 30.0,
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
        save: null,
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
        save: 40.0,
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
        save: null,
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
        save: 8.0,
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
        save: null,
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
        save: 14.0,
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
        save: null,
        tags: ["$5.99 Shipping"],
        stock: "in",
        thumbnail: productImg,
        categoryTags: ["popular"],
        wishlist: false,
        addToCard: true,
    },
];

// The actual filter — this is the "return products based on tags" part.
function getProductsByTag(tag) {
    return products.filter((product) => product.categoryTags.includes(tag));
}

const ProductsTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    // Bumping this on every tab click gives each grid a fresh React key,
    // which restarts the CSS animation below instead of skipping it when
    // the same array length happens to repeat.
    const [animKey, setAnimKey] = useState(0);

    const activeProducts = getProductsByTag(tabs[activeTab].tag);

    const handleTabClick = (i) => {
        setActiveTab(i);
        setAnimKey((k) => k + 1);
    };

    return (
        <section className="relative mx-auto w-full rounded-xl max-w-7xl bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-6">
                    {tabs.map((tab, i) => (
                        <button
                            key={tab.label}
                            onClick={() => handleTabClick(i)}
                            className={`text-sm font-bold uppercase tracking-wide transition ${i === activeTab
                                ? "text-gray-900"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <a
                    href="#"
                    className="text-xs font-medium text-gray-400 transition hover:text-primary"
                >
                    View All
                </a>
            </div>

            {/* Product grid for the active tab — fades + lifts in on every switch */}
            <div
                key={animKey}
                className="grid w-full grid-cols-1 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 animate-fade-in"
            >
                {
                    activeProducts.map((product, i) => (
                        <ProductCard key={`${activeTab}-${i}`} product={product} />
                    ))
                }
            </div>
        </section>
    );
};

export default ProductsTabs;