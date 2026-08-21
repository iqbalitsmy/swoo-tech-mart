import { Check } from 'lucide-react';
import React from 'react';

const CustomCheckBox = ({ checked, onChange, className = '' }) => {
    return (
        <label className={`relative inline-flex shrink-0 cursor-pointer ${className}`}>
            <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
            <div
                className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors
                ${checked ? 'border-primary bg-primary' : 'border-gray-300 bg-white'}
                peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1`}
            >
                {checked && <Check className="h-3.5 w-3.5 stroke-[3] text-white" />}
            </div>
        </label>
    );
};

export default CustomCheckBox;
