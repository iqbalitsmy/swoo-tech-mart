import React from 'react';

const Chip = ({ children, tone = "neutral" }) => {
    const tones = {
        neutral: "bg-gray-100 text-gray-700",
        primary: "bg-[color:var(--primary-light)]/20 text-[color:var(--primary-dark)]",
    };
    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
        >
            {children}
        </span>
    );
};

export default Chip;