import React from 'react';

const StarRow = ({ stars, count, checked, onChange }) => {
    return (
        <label className="flex cursor-pointer items-center gap-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 rounded border-gray-300 accent-primary"
            />
            <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span
                        key={i}
                        className={`text-sm ${i < stars ? 'text-amber-400' : 'text-gray-200'}`}
                    >
                        ★
                    </span>
                ))}
            </span>
            {count != null && (
                <span className="text-xs text-gray-400">({count})</span>
            )}
        </label>
    );
};

export default StarRow;