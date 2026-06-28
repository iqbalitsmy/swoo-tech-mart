import React from 'react';

const ProductPlaceholder = ({ image, title }) => {
    return (
        <div className="relative flex h-56  shrink-0 items-center justify-center sm:h-64">
            <div
                className={`flex h-full w-full flex-col items-center justify-center rounded-2xl text-white shadow-sm`}
            >
                <img src={image} alt={title} srcSet="" />
            </div>
        </div>
    );
};

export default ProductPlaceholder;