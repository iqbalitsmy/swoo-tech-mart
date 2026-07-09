import React from 'react';
import ActiveFilterChip from './ActiveFilterChip';
import PriceRange from './PriceRange';
import StarRow from './StarRow';
import SectionHeading from './SectionHeading';
import { useSearchParams } from 'react-router-dom';
import CheckBox from './CheckBox';

const CATEGORY_GROUPS = [
    {
        name: 'Cell Phones & Tablets',
        children: [
            { name: 'All' },
            { name: 'Iphone' },
            { name: 'Samsung' },
            { name: 'Xiaomi' },
            { name: 'Asus' },
            { name: 'Oppo' },
            { name: 'Gaming Smartphone' },
            { name: 'Ipad' },
            { name: 'Window Tablets' },
            { name: 'eReader' },
            { name: 'Smartphone Chargers' },
            { name: '5G Support Smartphone' },
            { name: 'Smartphone Accessories' },
            { name: 'Tablets Accessories' },
            { name: 'Cell Phones', maxPrice: 200 },
        ],
    },
];

const FILTER_OPTIONS = {
    brands: [
        { name: 'envato', count: 14 },
        { name: 'codecanyon', count: 6 },
        { name: 'videohive', count: 7 },
        { name: 'photodune', count: 18 },
        { name: 'microlancer', count: 1 },
    ],
    priceRange: [0, 10000],
    ratings: [
        { stars: 5, count: 52 },
        { stars: 4, count: 24 },
        { stars: 3, count: 5 },
        { stars: 2, count: 1 },
    ],
    screenSizes: ['7" & Under', '7.1" - 8.9"', '9" - 10.9"', '11" & Greater'],
    colors: [
        { name: 'Red', hex: '#ef4444' },
        { name: 'Blue', hex: '#3b82f6' },
        { name: 'Teal', hex: '#14b8a6' },
        { name: 'Black', hex: '#111827' },
        { name: 'White', hex: '#f9fafb' },
        { name: 'Green', hex: '#22c55e' },
        { name: 'Gray', hex: '#6b7280' },
        { name: 'Purple', hex: '#a855f7' },
    ],
    memoryOptions: [
        { label: '12GB', count: 4 },
        { label: '1.5GB', count: 1 },
        { label: '8GB', count: 3 },
        { label: '1GB', count: 1 },
        { label: '6GB', count: 12 },
        { label: '512MB', count: 2 },
        { label: '4GB', count: 6 },
        { label: '3GB', count: 7 },
    ],
};



const AllCategories = () => {
    const [params, setParams] = useSearchParams();

    const selectedCategory = params.get('category');
    const selectedBrands = params.getAll('brand');   // ?brand=X&brand=Y
    const selectedRatings = params.getAll('rating').map(Number);
    const selectedSize = params.get('screenSize');
    const selectedColor = params.get('color');
    const selectedMemory = params.getAll('memory');

    const setCategory = (name) => {
        setParams((prev) => {
            if (!name || name === 'All') {
                prev.delete('category');
            } else {
                prev.set('category', name);
            }
            return prev;
        });
    };

    // CHANGED: toggle helpers for multi-value params (brand, rating, memory).
    // getAll() returns an array; we add or remove the value then re-set all.
    const toggleMulti = (key, value) => {
        setParams((prev) => {
            const current = prev.getAll(key);
            prev.delete(key); // clear all existing values for this key
            const next = current.includes(String(value))
                ? current.filter((v) => v !== String(value))
                : [...current, String(value)];
            next.forEach((v) => prev.append(key, v));
            return prev;
        });
    };

    // CHANGED: single-value params (screenSize, color) toggle on/off.
    const toggleSingle = (key, value) => {
        setParams((prev) => {
            if (prev.get(key) === value) {
                prev.delete(key);
            } else {
                prev.set(key, value);
            }
            return prev;
        });
    };

    // CHANGED: reset clears the entire query string — no DEFAULT_FILTERS
    // object needed, just wipe the URL params.
    const handleReset = () => setParams({});

    // ── Build active filter chips from current URL params ─────────────────
    // CHANGED: chips are derived directly from URL params, not from a filters
    // state object — the URL is the single source of truth.
    const activeChips = [
        params.get('minPrice') && { label: `Min: $${params.get('minPrice')}`, remove: () => setParams((p) => { p.delete('minPrice'); return p; }) },
        params.get('maxPrice') && { label: `Max: $${params.get('maxPrice')}`, remove: () => setParams((p) => { p.delete('maxPrice'); return p; }) },
        params.get('screenSize') && { label: params.get('screenSize'), remove: () => setParams((p) => { p.delete('screenSize'); return p; }) },
        params.get('color') && { label: `Color: ${params.get('color')}`, remove: () => setParams((p) => { p.delete('color'); return p; }) },
        ...params.getAll('brand').map((b) => ({ label: b, remove: () => toggleMulti('brand', b) })),
        ...params.getAll('memory').map((m) => ({ label: m, remove: () => toggleMulti('memory', m) })),
        ...params.getAll('rating').map((r) => ({ label: `${r}★`, remove: () => toggleMulti('rating', r) })),
    ].filter(Boolean);

    return (
        <aside className="flex w-full flex-col gap-8 rounded-xl bg-[#f1f3f8] p-5">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
                    Categories
                </h2>
                {/* CHANGED: Reset All now just calls setParams({}) — one line,
                    no need to reset multiple pieces of state in ProductsPage */}
                {
                    activeChips.length > 0 && (
                        <button
                            onClick={handleReset}
                            className="text-xs font-medium text-primary hover:text-primary-dark"
                        >
                            Reset All
                        </button>
                    )
                }
            </div>

            {/* Active filter chips */}
            {
                activeChips.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {
                            activeChips.map((chip, i) => (
                                <ActiveFilterChip key={i} label={chip.label} onRemove={chip.remove} />
                            ))
                        }
                    </div>
                )
            }

            {/* Category tree */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => setCategory(null)}
                    className={`w-fit rounded-lg border px-4 py-2 text-sm font-semibold transition ${!selectedCategory
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary'
                        }`}
                >
                    All Categories
                </button>

                {
                    CATEGORY_GROUPS.map((group) => (
                        <div key={group.name}>
                            <p className="text-sm font-bold text-gray-900">{group.name}</p>
                            <ul className="mt-2 flex flex-col gap-1 pl-4">
                                {
                                    group.children.map((child) => (
                                        <li key={child.name}>
                                            {/* CHANGED: clicking a category sets ?category=Iphone in the URL
                                        instead of calling onSelectCategory() on ProductsPage */}
                                            <button
                                                onClick={() => setCategory(child.name)}
                                                className={`block w-full text-left text-sm transition hover:text-primary cursor-pointer ${selectedCategory === child.name
                                                    ? 'font-semibold text-primary'
                                                    : 'text-gray-600'
                                                    }`}
                                            >
                                                {child.name}
                                                {child.maxPrice && (
                                                    <span className="ml-2 text-xs text-gray-400">${child.maxPrice}</span>
                                                )}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>

            <div className="border-t border-gray-200" />

            {/* By Brands */}
            <div className="flex flex-col gap-2">
                <SectionHeading>By Brands</SectionHeading>
                <input
                    type="text"
                    placeholder="Search brands…"
                    className="rounded border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-primary"
                />
                <div className="flex flex-col gap-2 pt-1">
                    {
                        FILTER_OPTIONS.brands.map((brand) => (
                            // CHANGED: checked reads from URL ?brand= params,
                            // onChange calls toggleMulti which appends/removes ?brand=X
                            <CheckBox
                                key={brand.name}
                                label={brand.name}
                                count={brand.count}
                                checked={selectedBrands.includes(brand.name)}
                                onChange={() => toggleMulti('brand', brand.name)}
                            />
                        ))
                    }
                </div>
            </div>

            {/* By Price */}
            <div className="flex flex-col gap-3">
                <SectionHeading>By Price</SectionHeading>
                {/* CHANGED: PriceRange reads/writes URL params internally,
                    no value/onChange props needed from here */}
                <PriceRange min={FILTER_OPTIONS.priceRange[0]} max={FILTER_OPTIONS.priceRange[1]} />
            </div>

            {/* By Rating */}
            <div className="flex flex-col gap-2">
                <SectionHeading>By Rating</SectionHeading>
                {
                    FILTER_OPTIONS.ratings.map(({ stars, count }) => (
                        // CHANGED: checked reads ?rating= from URL,
                        // onChange calls toggleMulti('rating', stars)
                        <StarRow
                            key={stars}
                            stars={stars}
                            count={count}
                            checked={selectedRatings.includes(stars)}
                            onChange={() => toggleMulti('rating', stars)}
                        />
                    ))
                }
            </div>

            {/* By Screen Size */}
            <div className="flex flex-col gap-2">
                <SectionHeading>By Screen Size</SectionHeading>
                <div className="flex flex-wrap gap-2">
                    {
                        FILTER_OPTIONS.screenSizes.map((size) => (
                            // CHANGED: active state reads ?screenSize= from URL,
                            // click calls toggleSingle('screenSize', size)
                            <button
                                key={size}
                                onClick={() => toggleSingle('screenSize', size)}
                                className={`rounded border px-3 py-1 text-xs font-medium transition cursor-pointer ${selectedSize === size
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {size}
                            </button>
                        ))
                    }
                </div>
            </div>

            {/* By Color */}
            <div className="flex flex-col gap-2">
                <SectionHeading>By Color</SectionHeading>
                <div className="flex flex-wrap gap-2">
                    {
                        FILTER_OPTIONS.colors.map(({ name, hex }) => (
                            // CHANGED: active state reads ?color= from URL
                            <button
                                key={name}
                                onClick={() => toggleSingle('color', name)}
                                aria-label={name}
                                title={name}
                                className={`h-7 w-7 rounded-full border-2 transition cursor-pointer ${selectedColor === name
                                    ? 'scale-110 border-gray-900'
                                    : 'border-transparent hover:scale-105'
                                    }`}
                                style={{ backgroundColor: hex }}
                            />
                        ))
                    }
                </div>
            </div>

            {/* By Memory */}
            <div className="flex flex-col gap-2">
                <SectionHeading>By Memory</SectionHeading>
                <div className="grid grid-cols-2 gap-1">
                    {
                        FILTER_OPTIONS.memoryOptions.map(({ label, count }) => (
                            // CHANGED: checked reads ?memory= from URL
                            <CheckBox
                                key={label}
                                label={label}
                                count={count}
                                checked={selectedMemory.includes(label)}
                                onChange={() => toggleMulti('memory', label)}
                            />
                        ))
                    }
                </div>
            </div>
        </aside>
    );
};

export default AllCategories;