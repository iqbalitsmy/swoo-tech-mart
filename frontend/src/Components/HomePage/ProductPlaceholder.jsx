import React from 'react';

const ProductPlaceholder = ({ image, title }) => {
    return (
        <figure className="flex h-60 lg:h-80 w-auto shrink-0 items-center justify-center">
            <img  className="h-full w-full object-contain" src={image} alt={title} srcSet="" />
        </figure>
    );
};

export default ProductPlaceholder;