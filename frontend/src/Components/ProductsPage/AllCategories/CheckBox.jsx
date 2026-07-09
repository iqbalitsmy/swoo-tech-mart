import React from 'react';

const CheckBox = ({ checked, onChange, label, count }) => {
    return (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
            />
            <span className="flex-1">{label}</span>
            {
                count != null && (
                    <span className="text-xs text-gray-400">({count})</span>
                )
            }
        </label>
    );
};

export default CheckBox;