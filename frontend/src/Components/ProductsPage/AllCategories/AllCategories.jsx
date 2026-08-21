import React from 'react';
import ActiveFilterChip from './ActiveFilterChip';
import PriceRange from './PriceRange';
import StarRow from './StarRow';
import SectionHeading from './SectionHeading';
import { useSearchParams } from 'react-router-dom';
import CheckBox from './CheckBox';
import { useProductFilters } from '@/hooks/useProduct';


const AllCategories = () => {
    const [params, setParams] = useSearchParams();

    // CHANGED: ?category= now stores a SLUG, not a display name - the
    // /products/filters endpoint takes `category=<slug>`, and slugs also
    // sidestep URL-encoding issues names like "Cell Phones & Tablets" had.
    const selectedSlug = params.get('category');
    const selectedBrands = params.getAll('brand');   // now brand SLUGS
    const selectedRatings = params.getAll('rating').map(Number);
    const selectedSize = params.get('screenSize');
    const selectedColor = params.getAll('color');    // now color VALUEs (hex)
    const selectedMemory = params.getAll('memory');  // now memory VALUEs

    // CHANGED: the filters payload itself - categories here are contextual
    // (top-level when selectedSlug is null, children of selectedSlug
    // otherwise), so this single query drives both the category list AND
    // every other facet section below.
    const { data: filters, isLoading: isFiltersLoading } = useProductFilters(selectedSlug);

    const categoryData = filters?.categories;

    const parentCategory = categoryData?.parent;
    const categories = categoryData?.categories ?? [];

    const brands = filters?.brands ?? [];
    const priceRange = filters?.priceRanges;
    const ratings = filters?.ratings ?? [];
    const colors = filters?.colors ?? [];
    const memoryOptions = filters?.memory ?? [];

    const setCategory = (slug) => {
        setParams((prev) => {
            if (!slug) {
                prev.delete('category');
            } else {
                prev.set('category', slug);
            }
            return prev;
        });
    };

    // CHANGED: toggle helpers for multi-value params (brand, rating, color, memory).
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

    // CHANGED: single-value params (screenSize) toggle on/off.
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

    // Best-effort slug/value -> display-name lookups for chips, using
    // whatever the CURRENT filters response has in memory. If the matching
    // brand/memory option isn't in the current (category-scoped) list -
    // e.g. the category changed after the brand was selected - falls back
    // to showing the raw stored value rather than crashing or hiding the chip.
    const brandLabel = (slug) => brands.find((b) => b.slug === slug)?.name ?? slug;
    const memoryLabel = (value) => memoryOptions.find((m) => m.value === value)?.label ?? value;
    const colorLabel = (value) => colors.find((c) => c.value === value)?.label ?? value;

    // ── Build active filter chips from current URL params ─────────────────
    // CHANGED: chips are derived directly from URL params, not from a filters
    // state object — the URL is the single source of truth.
    const activeChips = [
        params.get('minPrice') && { label: `Min: $${params.get('minPrice')}`, remove: () => setParams((p) => { p.delete('minPrice'); return p; }) },
        params.get('maxPrice') && { label: `Max: $${params.get('maxPrice')}`, remove: () => setParams((p) => { p.delete('maxPrice'); return p; }) },
        params.get('screenSize') && { label: params.get('screenSize'), remove: () => setParams((p) => { p.delete('screenSize'); return p; }) },
        ...params.getAll('color').map((c) => ({ label: `Color: ${colorLabel(c)}`, remove: () => toggleMulti('color', c) })),
        ...params.getAll('brand').map((b) => ({ label: brandLabel(b), remove: () => toggleMulti('brand', b) })),
        ...params.getAll('memory').map((m) => ({ label: memoryLabel(m), remove: () => toggleMulti('memory', m) })),
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
                    className={`w-fit rounded-lg border px-4 py-2 text-sm font-semibold transition ${!selectedSlug
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                        }`}
                >
                    All Categories
                </button>

                {parentCategory ? (
                    <div>
                        <p className="text-sm font-bold text-gray-900">
                            {parentCategory.name}
                        </p>

                        <ul className="mt-2 flex flex-col gap-1 pl-4">
                            {isFiltersLoading ? (
                                <li className="text-xs text-gray-400">
                                    Loading...
                                </li>
                            ) : categories.length > 0 ? (
                                categories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            onClick={() => setCategory(category.slug)}
                                            className="block w-full cursor-pointer text-left text-sm text-gray-600 transition hover:text-primary"
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="text-xs text-gray-400">
                                    No subcategories
                                </li>
                            )}
                        </ul>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-1">
                        {isFiltersLoading ? (
                            <li className="text-xs text-gray-400">
                                Loading categories...
                            </li>
                        ) : (
                            categories.map((category) => (
                                <li key={category.id}>
                                    <button
                                        onClick={() => setCategory(category.slug)}
                                        className={`block w-full cursor-pointer rounded px-2 py-1 text-left text-sm font-semibold transition ${selectedSlug === category.slug
                                                ? "bg-primary text-white"
                                                : "text-gray-900 hover:text-primary"
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                )}
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
                    {isFiltersLoading ? (
                        <p className="text-xs text-gray-400">Loading…</p>
                    ) : (
                        brands.map((brand) => (
                            // CHANGED: checked/onChange now key off brand.slug
                            // (stable identifier), display text off brand.name.
                            <CheckBox
                                key={brand.slug}
                                label={brand.name}
                                count={brand.productCount}
                                checked={selectedBrands.includes(brand.slug)}
                                onChange={() => toggleMulti('brand', brand.slug)}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* By Price */}
            <div className="flex flex-col gap-3">
                <SectionHeading>By Price</SectionHeading>
                {/* CHANGED: priceRanges is a single { label, min, max } object
                    from the API now, not a static two-item array. Falls back
                    to 0–10000 while the first request is still in flight. */}
                <PriceRange min={priceRange?.min ?? 0} max={priceRange?.max ?? 10000} />
            </div>

            {/* By Rating */}
            <div className="flex flex-col gap-2">
                <SectionHeading>By Rating</SectionHeading>
                {isFiltersLoading ? (
                    <p className="text-xs text-gray-400">Loading…</p>
                ) : (
                    ratings.map(({ rating, productCount }) => (
                        // CHANGED: field names from the API are `rating` and
                        // `productCount` (not `stars`/`count`) - mapped onto
                        // StarRow's existing prop names here.
                        <StarRow
                            key={rating}
                            stars={rating}
                            count={productCount}
                            checked={selectedRatings.includes(rating)}
                            onChange={() => toggleMulti('rating', rating)}
                        />
                    ))
                )}
            </div>

            {/* By Screen Size */}
            {/* NOTE: /products/filters doesn't return screen sizes - this
                section has no backend-driven data source yet, so it's left
                as a static placeholder until that facet exists on the API. */}
            {/* <div className="flex flex-col gap-2">
                <SectionHeading>By Screen Size</SectionHeading>
                <div className="flex flex-wrap gap-2">
                    {
                        ['7" & Under', '7.1" - 8.9"', '9" - 10.9"', '11" & Greater'].map((size) => (
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
            </div> */}

            {/* By Color */}
            <div className="flex flex-col gap-2">
                <SectionHeading>By Color</SectionHeading>
                <div className="flex flex-wrap gap-2">
                    {isFiltersLoading ? (
                        <p className="text-xs text-gray-400">Loading…</p>
                    ) : (
                        colors.map(({ id, label, value, productCount }) => (
                            // CHANGED: field names from the API are
                            // `label`/`value` (not `name`/`hex`), and colors
                            // are now multi-select (toggleMulti) since the
                            // API models them with productCount like every
                            // other facet, rather than single-select.
                            <button
                                key={id}
                                onClick={() => toggleMulti('color', value)}
                                aria-label={`${label} (${productCount})`}
                                title={`${label} (${productCount})`}
                                className={`h-7 w-7 rounded-full border-2 transition cursor-pointer ${selectedColor.includes(value)
                                    ? 'scale-110 border-gray-900'
                                    : 'border-transparent hover:scale-105'
                                    }`}
                                style={{ backgroundColor: value }}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* By Memory */}
            <div className="flex flex-col gap-2">
                <SectionHeading>By Memory</SectionHeading>
                <div className="grid grid-cols-2 gap-1">
                    {isFiltersLoading ? (
                        <p className="text-xs text-gray-400">Loading…</p>
                    ) : (
                        memoryOptions.map(({ id, label, value, productCount }) => (
                            // CHANGED: checked/onChange key off `value`
                            // (stable identifier), display text is `label`.
                            <CheckBox
                                key={id}
                                label={label}
                                count={productCount}
                                checked={selectedMemory.includes(value)}
                                onChange={() => toggleMulti('memory', value)}
                            />
                        ))
                    )}
                </div>
            </div>
        </aside>
    );
};

export default AllCategories;