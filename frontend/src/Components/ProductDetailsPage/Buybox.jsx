import React, { useState } from "react";
import { Heart, RefreshCw, Truck } from "lucide-react";
import QuantityStepper from "./QuantityStepper";

import twitterIcon from "../../assets/icon/twitter.png"
import fbIcon from "../../assets/icon/fb.png"
import instagramIcon from "../../assets/icon/instagram.png"
import youtubeIcon from "../../assets/icon/youtube.png"
import pinterestIcon from "../../assets/icon/pinterest.png"
import PromoCallout from "./PromoCallout";

const socialIcons = [
    { icon: twitterIcon, label: "Twitter" },
    { icon: fbIcon, label: "Facebook" },
    { icon: instagramIcon, label: "Instagram" },
    { icon: youtubeIcon, label: "YouTube" },
];

const STOCK_LABELS = {
    in: { label: "In stock", dotClassName: "bg-primary" },
    out: { label: "Out of stock", dotClassName: "bg-danger" },
    preorder: { label: "Pre-order", dotClassName: "bg-gray-400" },
};

export default function BuyBox({
    totalPrice,
    promo,
    installment,
    stock,
    wishlisted = false,
    shipFromCountry,
    supportPhone,
}) {
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(wishlisted);

    const stockInfo = STOCK_LABELS[stock] || STOCK_LABELS.in;

    return (
        <div className="flex w-full flex-col gap-5 rounded-xl bg-gray-50 p-5">
            {/* Total price */}
            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Total price:
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                    ${totalPrice?.toFixed(2)}
                </p>
            </div>

            {/* Stock status */}
            <p className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <span className={`h-2 w-2 rounded-full ${stockInfo.dotClassName}`} />
                {stockInfo.label}
            </p>

            {
                promo && (
                    <div className="border-t border-gray-100 pt-4">
                        <PromoCallout {...promo} />
                    </div>
                )
            }

            {/* Quantity + CTAs */}
            <div className="flex flex-col gap-3">
                <QuantityStepper quantity={quantity} onChange={setQuantity} />

                <button className="w-full rounded-lg bg-primary py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark">
                    Add to cart
                </button>

                <button className="w-full rounded-lg bg-amber-400 py-3 text-sm font-bold uppercase tracking-wide text-gray-900 transition hover:bg-amber-500">
                    Buy Now
                </button>
            </div>

            {/* Wishlist / compare */}
            <div className="flex items-center gap-5 text-xs font-medium text-gray-600">
                <button
                    onClick={() => setIsWishlisted((prev) => !prev)}
                    aria-pressed={isWishlisted}
                    className={`flex items-center gap-1.5 transition hover:text-danger ${isWishlisted ? "text-danger" : ""
                        }`}
                >
                    <Heart className={`h-4 w-4 ${isWishlisted ? "fill-danger" : ""}`} />
                    {isWishlisted ? "Wishlist added" : "Add to wishlist"}
                </button>
            </div>

            {/* Trust badges */}
            <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-700">Share item:</p>
                <div className="flex items-center gap-2">
                    {
                        socialIcons.map(({ icon, label }) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-primary hover:text-white"
                            >
                                <figure>
                                    <img src={icon} alt={label} />
                                </figure>
                            </a>
                        ))
                    }
                </div>
            </div>

            {/* Quick order block */}
            {
                supportPhone && (
                    <div className="rounded-lg bg-gray-900 p-4 text-white">
                        <p className="text-xs font-bold uppercase tracking-wide">
                            Quick Order 24/7
                        </p>
                        <a
                            href={`tel:${supportPhone}`}
                            className="mt-1 block text-lg font-bold hover:text-primary-light"
                        >
                            {supportPhone}
                        </a>
                    </div>
                )
            }

            {
                shipFromCountry && (
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Truck className="h-3.5 w-3.5" />
                        Ships from <span className="font-semibold">{shipFromCountry}</span>
                    </p>
                )
            }
        </div>
    );
}