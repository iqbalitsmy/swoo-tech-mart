import React from 'react';
import Breadcrumb from '../../Components/Shared/Breadcrumb/Breadcrumb';
import productImg from "../../assets/products/laptop.jpg";
import ProductDetails from '../../Components/ProductDetailsPage/ProductDetails';

import descHeroImg from "../../assets/products/description1.png"
import descGridImg1 from "../../assets/products/description2.png"
import descGridImg2 from "../../assets/products/description3.png"
import ProductCarousel from '../../Components/Shared/ProductCarousel/ProductCarousel';
import RecentlyViewedSection from '../../Components/Shared/RecentlyView/RecentlyViewedSection';


const product = {
    id: "somseng-galatero-x6-ultra",
    title: "Somseng Galatero X6 Ultra LTE 4G/128GB, Black Smartphone",
    brand: "sumsong",
    sku: "ABC025168",
    category: "Cell Phones & Tablets",

    reviews: 5,
    isNew: true, // drives the "NEW" badge over the gallery

    // Price range shown at the top ("$569.00 - $609.00") comes from the
    // selected variants below — minPrice/maxPrice represent that range
    // across all combinations, totalPrice is whatever's currently selected.
    minPrice: 569.0,
    maxPrice: 609.0,
    totalPrice: 609.0,

    stock: "in",
    tags: ["Free Shipping", "Free Gift"],

    highlights: [
        "Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core",
        "DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory",
        "Commanding Power Design: Twin 16+1+2 Phases Digital VRM",
    ],

    images: [
        productImg,
        productImg,
        productImg,
        productImg, // first image is the large/main one; rest are thumbnails
    ],

    colorOptions: [
        { label: "Midnight Blue", value: "midnight-blue", price: 569.0, image: productImg },
        { label: "Deep Purple", value: "deep-purple", price: 569.0, image: productImg },
        { label: "Space Black", value: "space-black", price: 569.0, image: productImg },
    ],
    defaultColor: "midnight-blue",

    memoryOptions: [
        { label: "64GB", value: "64gb" },
        { label: "128GB", value: "128gb" },
        { label: "256GB", value: "256gb" },
        { label: "512GB", value: "512gb" },
    ],
    defaultMemory: "128gb",

    // Affirm-style installment line: "$49/m in 12 months"
    installment: { amountPerMonth: 49, months: 12 },

    // Promo callout box ("Buy 02 boxes get a Snack Tray...")
    promo: {
        icon: "🎁",
        lines: [
            { text: "Buy 02 boxes get a Snack Tray", highlight: "02" },
            { text: "Buy 04 boxes get a free Block Toys", highlight: "04" },
        ],
        expiresAt: "2024-05-25T21:00:00",
    },

    wishlisted: true, // drives the "Wishlist added" filled-heart state

    shipFromCountry: "United States",
    supportPhone: "(025) 3886 25 16",

    description: {
        // Opening paragraph. Supports inline <strong> / <a> for rich text without
        // storing a full HTML document. Content comes from this data file (not
        // user input), so dangerouslySetInnerHTML is safe to use in the component.
        intro:
            "Built for ultra-fast performance, the thin and lightweight Samsung Galaxy Tab S2 " +
            "goes anywhere you go. Photos, movies and documents pop on a crisp, clear Super AMOLED display. " +
            "Expandable memory lets you enjoy more of your favorite content. And connecting and sharing between " +
            "all your Samsung devices is easier than ever. Welcome to life with the reimagined Samsung Galaxy Tab S2. " +
            "Watch the world come to life on your tablet's <strong>Super AMOLED display *</strong>. " +
            "With deep contrast, rich colors and crisp details, you won't miss a thing.",

        // Full-width hero image shown directly below the intro paragraph.
        heroImage: { src: descHeroImg, alt: "Samsung Galaxy Tab S2 in hand" },
        heroCaption:
            "* The Galaxy Tab S2's 4:3 ratio display provides you with an ideal environment for performing office tasks.",

        // "From the manufacturer" block. Supports inline links with class attributes.
        manufacturerBody:
            "Dive into the blockbuster movies you can't wait to see. Switch between your favorite apps quickly and easily. " +
            "The new and improved octa-core processor gives you the power and speed you need to see more and do more. " +
            "Expand your tablet's memory from 32GB to up to an additional 128GB and enjoy more of your favorite music, " +
            "photos, movies and games on the go with a microSD card. With Quick Connect, start a show on your Smart TV " +
            "and, with the touch of a button, take it with you by moving it to your Galaxy Tab S2.<br/><br/>" +
            "Or send videos and photos from your tablet " +
            '<a href="#" class="text-primary underline">screen to your TV</a> ' +
            "to share with everyone in the room. Work effortlessly between your Samsung tablet and Samsung smartphone " +
            "with SideSync. Quickly drag and drop photos between devices. And even respond to a call from your smartphone right on your tablet screen.",

        // Exactly two images shown side-by-side. Add or remove items and the
        // component will only render the grid when there are exactly 2.
        gridImages: [
            { src: descGridImg1, alt: "Man using Samsung Galaxy Tab S2" },
            { src: descGridImg2, alt: "Samsung Galaxy Tab S2 app screen close-up" },
        ],

        // Collapsible sub-section shown at the bottom of the description.
        subSection: {
            title: "Semsong Galaxy Tab S2, 8-Inch, White",
            body:
                "The Samsung Galaxy Tab S2 offers dual cameras: a rear-facing 8-megapixel camera with Auto Focus " +
                "and a 2.1-megapixel camera on the front. Take high-quality pictures and video or video chat with " +
                "friends, family, and colleagues. Customize your Galaxy Tab S2 with the apps you use most. " +
                "The Samsung Galaxy Essentials widget provides a collection of premium complimentary apps optimized " +
                "for your tablet screen. Select and download the apps you want to instantly upgrade your tablet experience.",
        },
    },

    // ── ADDED: feedback ──────────────────────────────────────────────────────
    // Powers the CustomerFeedback component. `ratingBreakdown` keys are star
    // counts (5→1); values are percentages that must sum to 100. Each review
    // in `reviews` has its own avatar, name, rating, timestamp, and body.
    feedback: {
        averageRating: 3.7,
        totalRatings: 104,
        ratingBreakdown: { 5: 40, 4: 30, 3: 20, 2: 5, 1: 5 },
        reviews: [
            {
                id: 1,
                name: "Kristin Watson",
                avatar: null,
                rating: 3.5,
                timestamp: "2024-06-01T10:30:00",
                body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse modi perspiciatis omnis, delectus quos mollitia maiores. Architecto aspernatur quae odio fuga labore facilis optio nisi!",
            },
            {
                id: 2,
                name: "Jane Cooper",
                avatar: null,
                rating: 3.5,
                timestamp: "2024-05-01T08:00:00",
                body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse modi perspiciatis omnis, delectus quos mollitia maiores. Architecto aspernatur quae odio fuga labore facilis optio nisi!",
            },
            {
                id: 3,
                name: "Robert Fox",
                avatar: null,
                rating: 4,
                timestamp: "2024-04-15T14:20:00",
                body: "Great product overall. Build quality is excellent and performance is impressive for this price point.",
            },
            {
                id: 4,
                name: "Eleanor Pena",
                avatar: null,
                rating: 5,
                timestamp: "2024-03-22T09:15:00",
                body: "Absolutely love it. Delivery was fast and packaging was secure. Will definitely recommend to friends.",
            },
        ],
    },

    relatedProducts: [
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
    ]
};

const items = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Top Cell Phones & Tablets", href: "/shop/cellphones-tablets" },
    { label: product.title },
]

const ProductDetailsPage = () => {
    return (
        <div className='min-h-screen'>
            <Breadcrumb items={items} />
            <ProductDetails product={product} />
            <section className='container max-w-6xl mx-auto mb-6'>
                <ProductCarousel products={product.relatedProducts} title={"Related Products"} />
            </section>
            <section className='container max-w-6xl mx-auto mb-6'>
                <RecentlyViewedSection />
            </section>
        </div>
    );
};

export default ProductDetailsPage;