import React from 'react';

const Breadcrumb = ({ items = [] }) => {
    if (items.length === 0) return null;

    const lastIndex = items.length - 1;

    return (
        <nav
            aria-label="Breadcrumb"
            className="w-full bg-gray-100 px-5 py-3"
        >
            <ol className="container mx-auto max-w-7xl flex flex-wrap items-center gap-2 text-sm">
                {
                    items.map((item, i) => {
                        const isLast = i === lastIndex;

                        return (
                            <li key={i} className="flex items-center gap-2 last:text-gray-900">
                                {
                                    isLast ? (
                                        <>
                                            <span className="" aria-current="page">
                                                {item.label}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <a
                                                href={item.href || "#"}
                                                className="text-gray-500 transition hover:text-primary"
                                            >
                                                {item.label}
                                            </a>
                                            <span className="text-gray-300 ">/</span>
                                        </>
                                    )
                                }
                            </li>
                        );
                    })
                }
            </ol>
        </nav>
    );
};

export default Breadcrumb;