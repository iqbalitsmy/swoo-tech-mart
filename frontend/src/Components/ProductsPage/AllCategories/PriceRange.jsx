import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';


const PriceRange = ({ min, max }) => {
    const [params, setParams] = useSearchParams();

    // Draft state — holds both handle positions locally.
    // Only pushed to the URL when the user clicks "Go", so fast
    // dragging doesn't fire a fetch on every pixel of movement.
    const [draft, setDraft] = useState([
        Number(params.get('minPrice') ?? min),
        Number(params.get('maxPrice') ?? max),
    ]);

    const apply = () => {
        setParams((prev) => {
            prev.set('minPrice', draft[0]);
            prev.set('maxPrice', draft[1]);
            return prev;
        });
    };

    // Keep input box edits clamped so min never exceeds max
    const setMin = (val) => {
        const clamped = Math.min(Math.max(val, min), draft[1]);
        setDraft([clamped, draft[1]]);
    };
    const setMax = (val) => {
        const clamped = Math.max(Math.min(val, max), draft[0]);
        setDraft([draft[0], clamped]);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Dual-handle slider
                shadcn's Slider accepts an array value for range mode.
                The green filled track between the two thumbs comes from
                shadcn's built-in [&_[data-*]] range fill styles — it uses
                your CSS variable --primary automatically via accent color.
                Override the track/thumb colors below to match your token. */}
            <Slider
                min={min}
                max={max}
                step={1}
                value={draft}
                onValueChange={setDraft}
                className="w-full
                        [&_[data-slot=slider-track]]:h-1.5
                        [&_[data-slot=slider-track]]:bg-white
                        [&_[data-slot=slider-track]]:cursor-pointer
                        [&_[data-slot=slider-range]]:bg-primary
                        [&_[data-slot=slider-thumb]]:size-4
                        [&_[data-slot=slider-thumb]]:border-0
                        [&_[data-slot=slider-thumb]]:bg-primary
                        [&_[data-slot=slider-thumb]]:shadow-md
                        [&_[data-slot=slider-thumb]]:ring-0
                        [&_[data-slot=slider-thumb]]:focus-visible:ring-2
                        [&_[data-slot=slider-thumb]]:focus-visible:ring-primary"
            />

            {/* Number inputs + Go button */}
            <div className="flex items-center gap-2">
                {/* Min input */}
                <div className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-1 py-2 shadow-sm">
                    <span className="text-xs font-medium text-gray-900">$</span>
                    <input
                        type="number"
                        value={draft[0]}
                        min={min}
                        max={draft[1]}
                        onChange={(e) => setMin(Number(e.target.value))}
                        className="w-14 bg-transparent text-xs font-medium text-gray-900 outline-none"
                    />
                </div>

                <span className="text-sm text-gray-400">—</span>

                {/* Max input */}
                <div className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-1 py-2 shadow-sm">
                    <span className="text-xs font-medium text-gray-900">$</span>
                    <input
                        type="number"
                        value={draft[1]}
                        min={draft[0]}
                        max={max}
                        onChange={(e) => setMax(Number(e.target.value))}
                        className="w-14 bg-transparent text-xs font-medium text-gray-900 outline-none"
                    />
                </div>

                {/* Go button — only writes to the URL when clicked */}
                <button
                    onClick={apply}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark active:scale-95 cursor-pointer"
                >
                    Go
                </button>
            </div>
        </div>
    );
};

export default PriceRange;