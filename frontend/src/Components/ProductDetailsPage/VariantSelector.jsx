import React from "react";

/**
 * Reusable variant picker — handles both the color swatches (image + price
 * per option) and the plain memory-size buttons (label only), since both
 * are the same "pick one of N options" pattern underneath.
 *
 * Props:
 * - label: e.g. "Color" or "Memory Size"
 * - selectedLabel: currently selected option's display label, shown next
 *     to the section title (e.g. "COLOR: Midnight Blue")
 * - options: array of { label, value, price?, image? } — `price`/`image`
 *     are optional; when present (color), the button shows an image +
 *     price; when absent (memory), it's just a plain text button.
 * - selectedValue: the currently selected option's `value`
 * - onSelect: (value) => void
 */
export default function VariantSelector({
    label,
    selectedLabel,
    options = [],
    selectedValue,
    onSelect,
}) {
    if (options.length === 0) return null;

    const hasImages = options.some((opt) => opt.image);

    return (
        <div>
            <p className="text-sm">
                <span className="font-bold text-gray-900">{label}:</span>{" "}
                <span className="text-gray-600">{selectedLabel}</span>
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
                {options.map((option) => {
                    const isSelected = option.value === selectedValue;

                    return (
                        <button
                            key={option.value}
                            onClick={() => onSelect(option.value)}
                            aria-pressed={isSelected}
                            className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-left transition ${isSelected
                                    ? "border-primary"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            {hasImages && option.image && (
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-50">
                                    <img
                                        src={option.image}
                                        alt={option.label}
                                        className="h-full w-full object-contain"
                                    />
                                </span>
                            )}
                            <span>
                                <span className="block text-xs font-semibold text-gray-900">
                                    {option.label}
                                </span>
                                {option.price != null && (
                                    <span className="block text-xs text-gray-500">
                                        ${option.price.toFixed(2)}
                                    </span>
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}