import React from "react";
import { Minus, Plus } from "lucide-react";

/**
 * Simple controlled quantity stepper. Parent owns the actual quantity
 * state — this component just renders -/value/+ and calls back.
 */
export default function QuantityStepper({ quantity, onChange, min = 1, max = 99 }) {
    const decrease = () => onChange(Math.max(min, quantity - 1));
    const increase = () => onChange(Math.min(max, quantity + 1));

    return (
        <div className="flex h-11 items-center rounded-lg border border-gray-200">
            <button
                onClick={decrease}
                disabled={quantity <= min}
                aria-label="Decrease quantity"
                className="flex h-full w-11 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:opacity-30"
            >
                <Minus className="h-4 w-4" />
            </button>
            <span className="flex h-full flex-1 items-center justify-center text-sm font-semibold text-gray-900">
                {quantity}
            </span>
            <button
                onClick={increase}
                disabled={quantity >= max}
                aria-label="Increase quantity"
                className="flex h-full w-11 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:opacity-30"
            >
                <Plus className="h-4 w-4" />
            </button>
        </div>
    );
}