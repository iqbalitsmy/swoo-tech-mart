import React from "react";
import ProductCardHorizontal from "../../Shared/Main/ProductCard/ProductCardHorizontal";
import productImg from "../../../assets/products/laptop.jpg"

// Swap with real recently-viewed data (likely from localStorage or an
// API call keyed by user session) — shape matches your existing ProductCard.
const recentlyViewed = [
    { title: "BOSO 2 Wireless On Ear Headphone", price: 359.0, rating: 3.5, thumbnail: productImg },
    { title: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS", price: 569.0, rating: 4, thumbnail: productImg },
    { title: "uLosk Mini case 2.0, Xenon i10 / 32GB", price: 1729.0, rating: 5, thumbnail: productImg },
    { title: "Oppto Watch Series 8 GPS + Cellular", price: 979.0, rating: 3.5, thumbnail: productImg },
    { title: "Xiaomi Redmi Note 5, 64GB", price: 1239.0, rating: 4.5, thumbnail: productImg },
    { title: "aMoc All-in-one Computer M1", price: 1729.0, rating: 4, thumbnail: productImg },
];

const RecentlyViewedSection = () => {
    return (
        <section className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                Recently Viewed
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {recentlyViewed.map((product, i) => (
                    <ProductCardHorizontal key={i} product={product} />
                ))}
            </div>
        </section>
    );
}

export default RecentlyViewedSection;