import React from 'react';

const SubcategoryCard = ({ image, name, itemCount }) => {
    return (
        <a href="#" className="flex items-center justify-between gap-3">
            <span>
                <span className="block text-sm font-semibold text-gray-900 line-clamp-1">{name}</span>
                <span className="block text-xs text-gray-400">{itemCount} Items</span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                {
                    image ? (
                        <img src={image} alt={name} className="h-full w-full object-cover" />
                    ) : (
                        <span className="text-[9px] font-medium text-gray-400">Photo</span>
                    )
                }
            </span>
        </a>
    );
};

export default SubcategoryCard;