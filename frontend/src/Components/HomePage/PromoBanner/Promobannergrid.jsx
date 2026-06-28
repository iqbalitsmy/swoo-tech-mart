import React from "react";
import cashbackBanner from "../../assets/banners/cashback-banner.jpg";
import appDownloadBanner from "../../assets/banners/app-download-banner.jpg";

const PromoBannerGrid = () => {
    return (
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            <img
                src={cashbackBanner}
                alt="10% cash back on Swootech"
                className="h-full w-full rounded-xl object-cover"
            />
            <img
                src={appDownloadBanner}
                alt="Download our app"
                className="h-full w-full rounded-xl object-cover"
            />
        </div>
    );
}

export default PromoBannerGrid;