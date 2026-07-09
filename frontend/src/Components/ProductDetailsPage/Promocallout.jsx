import React from "react";

export default function PromoCallout({ icon, lines = [], expiresAt }) {
    if (lines.length === 0) return null;

    return (
        <div className="flex items-start gap-3 rounded-xl bg-primary-light/15 p-4">
            {/* {
                icon && <span className="text-3xl leading-none">{icon}</span>
            } */}

            <div className="flex-1">
                <ul className="flex flex-col gap-1">
                    {
                        lines.map((line, i) => {
                            const parts = line.highlight
                                ? line.text.split(line.highlight)
                                : [line.text];

                            return (
                                <li key={i} className="text-xs text-gray-700">
                                    🎁{" "}
                                    {
                                        parts.length === 2 ? (
                                            <>
                                                {parts[0]}
                                                <span className="font-bold text-danger">{line.highlight}</span>
                                                {parts[1]}
                                            </>
                                        ) : (
                                            line.text
                                        )
                                    }
                                </li>
                            );
                        })
                    }
                </ul>

                {
                    expiresAt && (
                        <p className="mt-2 text-[11px] italic text-gray-500">
                            Promotion will expires in:{" "}
                            {
                                new Date(expiresAt).toLocaleString(undefined, {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                            }
                        </p>
                    )
                }
            </div>
        </div>
    );
}