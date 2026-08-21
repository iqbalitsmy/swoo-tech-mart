import React from "react";

const SubcategoryItem = ({ categoryIcon, name, productCount }) => {
    return (
        <div className="group flex flex-col items-center gap-2 text-center">
            <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-100 transition group-hover:bg-gray-200">
                {categoryIcon ? (
                    <img src={categoryIcon} alt={name} className="h-full w-full object-cover" />
                ) : (
                    <span className="text-[10px] font-medium text-gray-400">Photo</span>
                )}
            </span>
            <span className="text-sm font-semibold text-gray-900">{name}</span>
            <span className="text-xs text-gray-400">{productCount} Items</span>
        </div>
    );
}

export default SubcategoryItem;