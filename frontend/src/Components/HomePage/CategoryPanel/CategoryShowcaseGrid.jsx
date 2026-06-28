import React from "react";
import CategoryShowcasePanel from "./CategoryShowcasePanel";

import speakerBanner from "../../../assets/categories/speaker-banner.png"
import speakerImg from "../../../assets/categories/speaker.png"
import cameraImg from "../../../assets/categories/camera.png"
import earbudsImg from "../../../assets/categories/earbuds.png"
import microphoneImg from "../../../assets/categories/microphone.png"


import mouseBanner from "../../../assets/categories/mouse-banner.png"
import monitorImg from "../../../assets/categories/monitor.png"
import chairImg from "../../../assets/categories/chair.png"
import controllerImg from "../../../assets/categories/controller.png"
import keyboardsImg from "../../../assets/categories/keyboards.png"


import projectorBanner from "../../../assets/categories/projector-banner.png"
import printerImg from "../../../assets/categories/printer.png"
import networkImg from "../../../assets/categories/network.png"
import securityImg from "../../../assets/categories/security.png"
import projectorsImg from "../../../assets/categories/projectors.png"

const panels = [
    {
        title: "Audios & Cameras",
        bannerImage: speakerBanner,
        bannerOverlayLines: ["Best", "Speaker", "2023"],
        bannerHref: "#",
        subcategories: [
            { image: speakerImg, name: "Speaker", itemCount: 12 },
            { image: cameraImg, name: "DSLR Camera", itemCount: 9 },
            { image: earbudsImg, name: "Earbuds", itemCount: 5 },
            { image: microphoneImg, name: "Microphone", itemCount: 12 },
        ],
    },
    {
        title: "Gaming",
        bannerImage: mouseBanner,
        bannerOverlayLines: ["Wireless", "RGB Gaming", "Mouse"],
        bannerHref: "#",
        subcategories: [
            { image: monitorImg, name: "Monitors", itemCount: 28 },
            { image: chairImg, name: "Chair", itemCount: 12 },
            { image: controllerImg, name: "Controller", itemCount: 9 },
            { image: keyboardsImg, name: "Keyboards", itemCount: 30 },
        ],
    },
    {
        title: "Office Equipments",
        bannerImage: projectorBanner,
        bannerOverlayLines: ["Home Thearther 4k", "Laser Projector"],
        bannerHref: "#",
        subcategories: [
            { image: printerImg, name: "Printers", itemCount: 9 },
            { image: networkImg, name: "Network", itemCount: 90 },
            { image: securityImg, name: "Security", itemCount: 12 },
            { image: projectorsImg, name: "Projectors", itemCount: 12 },
        ],
    },
];

export default function CategoryShowcaseGrid() {
    return (
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-6 sm:grid-cols-3">
            {
                panels.map((panel) => (
                    <CategoryShowcasePanel key={panel.title} {...panel} />
                ))
            }
        </div>
    );
}