import React from "react";
import CategoryPromoSection from "./CategoryPromoSection";
import productImg from "../../../assets/products/laptop.jpg";

import mobileBanner from "../../../assets/promo-section/mobile-banner.png"
import laptopBanner from "../../../assets/promo-section/laptop-banner.png"

import cellPhoneSmallImg from "../../../assets/promo-section/iphone.png"
import mackBookSmallImg from "../../../assets/promo-section/mackbook.png"


const cellphonesSection = {
    title: "Top Cellphones & Tablets",
    bannerImage: mobileBanner,
    bannerHeading: "Redmi Note 12 Pro+ 5G",
    bannerSubtext: "Rise to the challenge",
    bannerCta: "Shop now",
    bannerVariant: "light",
    subcategories: [
        { image: cellPhoneSmallImg, name: "iPhone (iOS)", itemCount: 74 },
        { image: cellPhoneSmallImg, name: "Android", itemCount: 35 },
        { image: cellPhoneSmallImg, name: "5G Support", itemCount: 12 },
        { image: cellPhoneSmallImg, name: "Gaming", itemCount: 9 },
        { image: cellPhoneSmallImg, name: "Xiaomi", itemCount: 52 },
        { image: cellPhoneSmallImg, name: "Accessories", itemCount: 28 },
    ],
    products: [
        {
            reviews: 152,
            title: "SROK Smart Phone 128GB, Oled Retina",
            price: 579.0,
            rating: 4,
            oldPrice: 859.0,
            save: 199.0,
            tags: ["Free Shipping"],
            stock: "in",
            thumbnail: productImg,
        },
        {
            reviews: null,
            title: "iPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
            price: 979.0,
            priceRange: [979.0, 1259.0],
            rating: 4.5,
            oldPrice: null,
            save: null,
            tags: ["$2.99 Shipping"],
            stock: "in",
            thumbnail: productImg,
        },
        {
            reviews: 5,
            title: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
            price: 659.0,
            rating: 4,
            oldPrice: null,
            save: null,
            tags: [],
            stock: "in",
            thumbnail: productImg,
        },
        {
            reviews: 9,
            title: "Xiaomi Redmi Note 5, 64GB",
            price: 1239.0,
            rating: 4.5,
            oldPrice: 1619.0,
            save: 59.0,
            tags: ["Free Shipping"],
            stock: "contact",
            thumbnail: productImg,
        },
        {
            reviews: 8,
            title: "Microsute Alpha Ultra S5 Surface 128GB 2022, Sliver",
            price: 1729.0,
            rating: 4,
            oldPrice: null,
            save: null,
            tags: ["Free Shipping"],
            stock: "contact",
            thumbnail: productImg,
        },
    ],
};

const laptopsSection = {
    title: "Best Laptops & Computers",
    bannerImage: laptopBanner,
    bannerHeading: "Mobok 2 Superchard",
    bannerSubtext: "By M2 — Start from $1199",
    bannerCta: "Shop now",
    bannerVariant: "dark",
    subcategories: [
        { image: mackBookSmallImg, name: "Macbook", itemCount: 74 },
        { image: mackBookSmallImg, name: "Gaming PC", itemCount: 5 },
        { image: mackBookSmallImg, name: "Laptop Office", itemCount: 22 },
        { image: mackBookSmallImg, name: 'Laptop 15"', itemCount: 55 },
        { image: mackBookSmallImg, name: "M1 2023", itemCount: 32 },
        { image: mackBookSmallImg, name: "Secondhand", itemCount: 18 },
    ],
    products: [
        {
            reviews: 152,
            title: "Pineapple Macbook Pro 2022 M1 / 512 GB",
            price: 579.0,
            rating: 4.5,
            oldPrice: null,
            save: null,
            tags: ["Free Shipping"],
            stock: "in",
            thumbnail: productImg,
        },
        {
            reviews: null,
            title: "C&O Bluetooth Speaker",
            price: 979.0,
            rating: 4,
            oldPrice: null,
            save: null,
            tags: ["Free Shipping"],
            stock: "in",
            thumbnail: productImg,
        },
        {
            reviews: 5,
            title: "Gigaby Custome Case, i7 / 16GB / SSD 256GB",
            price: 1259.0,
            rating: 4,
            oldPrice: null,
            save: null,
            tags: ["Free Shipping", "Free Gift"],
            stock: "in",
            thumbnail: productImg,
        },
        {
            reviews: 9,
            title: "BEOS PC Gaming Case",
            price: 1239.0,
            rating: 4.5,
            oldPrice: 1619.0,
            save: 59.0,
            tags: ["$2.99 Shipping"],
            stock: "contact",
            thumbnail: productImg,
        },
        {
            reviews: 8,
            title: "aMoc All-in-one Computer M1",
            price: 1729.0,
            rating: 4,
            oldPrice: null,
            save: null,
            tags: ["Free Shipping"],
            stock: "contact",
            thumbnail: productImg,
        },
    ],
};

export default function CategoryPromoSections() {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-6">
            <CategoryPromoSection {...cellphonesSection} />
            <CategoryPromoSection {...laptopsSection} />
        </div>
    );
}