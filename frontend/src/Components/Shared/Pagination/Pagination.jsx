import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Pagination
 *
 * Reads ?page= from the URL and writes back to it on click.
 * ProductsPage's useEffect watches searchParams, so every page
 * change automatically triggers a new API fetch — no prop callbacks needed.
 *
 * Props:
 *   totalPages  (number) — total number of pages from the API response
 *   sibling     (number) — how many page buttons to show on each side
 *                          of the active page (default 1)
 *
 * Usage:
 *   <Pagination totalPages={20} />
 */

// Builds the page number array with ellipsis markers.
// e.g. [1, '...', 4, 5, 6, '...', 20]
function buildPageRange(current, total, sibling = 1) {
    const delta = sibling + 2; // pages around current + boundaries
    const range = [];
    const rangeWithDots = [];

    // Always include first, last, and a window around current
    const left = Math.max(2, current - sibling);
    const right = Math.min(total - 1, current + sibling);

    for (let i = left; i <= right; i++) range.push(i);

    // Left ellipsis
    if (left > 2) range.unshift('...');
    // Right ellipsis
    if (right < total - 1) range.push('...');

    // Always show page 1 and last page
    return [1, ...range, total];
}

const Pagination = ({ totalPages = 1, sibling = 1 }) => {
    const [params, setParams] = useSearchParams();
    const current = Math.max(1, Number(params.get('page') ?? 1));

    if (totalPages <= 1) return null;

    const pages = buildPageRange(current, totalPages, sibling);

    const goTo = (page) => {
        if (page < 1 || page > totalPages || page === current) return;
        setParams((prev) => {
            prev.set('page', page);
            return prev;
        });
        // Scroll back to top so the user sees the new results
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav aria-label="Pagination" className="flex items-center gap-1.5">
            {/* Prev */}
            <button
                onClick={() => goTo(current - 1)}
                disabled={current === 1}
                aria-label="Previous page"
                className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronLeft className="h-4 w-4" />
                Prev
            </button>

            {/* Page numbers */}
            {
                pages.map((page, i) =>
                    page === '...' ? (
                        <span
                            key={`dots-${i}`}
                            className="flex h-9 w-9 items-center justify-center text-sm text-gray-400"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => goTo(page)}
                            aria-label={`Page ${page}`}
                            aria-current={page === current ? 'page' : undefined}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition ${page === current
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary'
                                }`}
                        >
                            {page}
                        </button>
                    )
                )
            }

            {/* Next */}
            <button
                onClick={() => goTo(current + 1)}
                disabled={current === totalPages}
                aria-label="Next page"
                className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
};

export default Pagination;