import React from 'react';

const SectionHeading = ({ children }) => {
    return (
        <p className="text-xs font-bold uppercase tracking-wide text-gray-900">
            {children}
        </p>
    );
};

export default SectionHeading;