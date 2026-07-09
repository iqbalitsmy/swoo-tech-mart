import React from 'react';

const ActiveFilterChip = ({ label, onRemove }) => {
    return (
        <span className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600">
            {label}
            <button
                onClick={onRemove}
                aria-label={`Remove ${label} filter`}
                className="ml-1 text-gray-400 hover:text-danger"
            >
                ✕
            </button>
        </span>
    );
};

export default ActiveFilterChip;