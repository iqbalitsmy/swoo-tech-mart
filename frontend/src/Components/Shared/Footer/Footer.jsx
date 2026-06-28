import React, { useState } from "react";
import twitterIcon from "../../../assets/icon/twitter.png"
import fbIcon from "../../../assets/icon/fb.png"
import instagramIcon from "../../../assets/icon/instagram.png"
import youtubeIcon from "../../../assets/icon/youtube.png"
import pinterestIcon from "../../../assets/icon/pinterest.png"
import { ChevronDown } from "lucide-react";

const topCategories = [
    "Laptops",
    "PC & Computers",
    "Cell Phones",
    "Tablets",
    "Gaming & VR",
    "Networks",
    "Cameras",
    "Sounds",
    "Office",
];

const companyLinks = [
    "About Swoo",
    "Contact",
    "Career",
    "Blog",
    "Sitemap",
    "Store Locations",
];

const helpCenterLinks = [
    "Customer Service",
    "Policy",
    "Terms & Conditions",
    "Track Order",
    "FAQs",
    "My Account",
    "Product Support",
];

const partnerLinks = ["Become Seller", "Affiliate", "Advertise", "Partnership"];

const socialIcons = [
    { icon: twitterIcon, label: "Twitter" },
    { icon: fbIcon, label: "Facebook" },
    { icon: instagramIcon, label: "Instagram" },
    { icon: youtubeIcon, label: "YouTube" },
    // lucide has no dedicated Pinterest icon — swap for a custom/brand SVG if needed
];

// Payment logos — you'll provide these. Swap each `null` for a real
// <img src={...} /> once you have the assets, e.g.:
//   { name: "Visa", image: visaLogo }
const paymentMethods = [
    { name: "PayPal", image: null },
    { name: "Mastercard", image: null },
    { name: "Visa", image: null },
    { name: "Stripe", image: null },
    { name: "Klarna", image: null },
];

const FooterColumn = ({ title, links }) => {
    return (
        <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">
                {title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                    <li key={link}>
                        <a
                            href="#"
                            className="text-sm text-gray-500 transition hover:text-primary"
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Wire this up to your actual newsletter API
        console.log("Subscribe:", email);
    };

    return (
        <footer className="w-full border-t border-gray-100 bg-white px-6 py-10">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
                {/* Brand / contact column */}
                <div className="lg:col-span-2">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                        Swoo - 1st NYC Tech Online Market
                    </h2>

                    <p className="mt-5 text-xs font-medium uppercase text-gray-400">
                        Hotline 24/7
                    </p>
                    <a
                        href="tel:+0253686 2516"
                        className="mt-1 block text-lg font-bold text-primary"
                    >
                        (025) 3686 25 16
                    </a>

                    <address className="mt-4 text-sm not-italic leading-relaxed text-gray-500">
                        257 Thatcher Road St, Brooklyn, Manhattan,
                        <br />
                        NY 10092
                        <br />
                        <a href="mailto:contact@swootechmart.com" className="hover:text-primary">
                            contact@swootechmart.com
                        </a>
                    </address>

                    {/* Social icons */}
                    <div className="mt-5 flex items-center gap-2">
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

                    {/* Currency / language selectors */}
                    <div className="mt-6 flex items-center gap-3">
                        <button className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-300">
                            USD
                            <ChevronDown className="h-3 w-3" />
                        </button>
                        <button className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-300">
                            <span className="text-sm leading-none">🇺🇸</span>
                            Eng
                            <ChevronDown className="h-3 w-3" />
                        </button>
                    </div>
                </div>

                {/* Link columns */}
                <FooterColumn title="Top Categories" links={topCategories} />
                <FooterColumn title="Company" links={companyLinks} />
                <FooterColumn title="Help Center" links={helpCenterLinks} />
                <FooterColumn title="Partner" links={partnerLinks} />
            </div>

            {/* Newsletter subscribe — aligned under the link columns via the same grid */}
            <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
                <div className="hidden lg:col-span-2 lg:block" aria-hidden="true" />

                <div className="lg:col-span-4">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                        Subscribe &amp; Get{" "}
                        <span className="text-danger">10% Off</span> for your first order
                    </h3>

                    <form
                        onSubmit={handleSubscribe}
                        className="mt-4 flex items-center border-b border-gray-200 pb-2"
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                        />
                        <button
                            type="submit"
                            className="shrink-0 text-xs font-bold uppercase tracking-wide text-primary transition hover:text-primary-dark"
                        >
                            Subscribe
                        </button>
                    </form>

                    <p className="mt-3 text-xs italic text-gray-400">
                        By subscribing, you're accepted the our{" "}
                        <a href="#" className="font-semibold underline hover:text-primary">
                            Policy
                        </a>
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mx-auto mt-10 w-full max-w-6xl border-t border-gray-100 pt-5">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <p className="text-xs text-gray-400">
                        © 2024 <span className="font-bold text-gray-600">Shawonetc3</span>.
                        All Rights Reserved
                    </p>

                    {/* Payment logos placeholder row */}
                    <div className="flex items-center gap-4">
                        {paymentMethods.map(({ name, image }) => (
                            <span key={name} className="flex h-6 items-center" title={name}>
                                {
                                    image ? (
                                        <img src={image} alt={name} className="h-full object-contain" />
                                    ) : (
                                        <span className="text-[10px] font-medium text-gray-300">
                                            {name}
                                        </span>
                                    )
                                }
                            </span>
                        ))}
                    </div>

                    <a
                        href="#"
                        className="text-xs font-medium text-primary hover:text-primary-dark"
                    >
                        Mobile Site
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;