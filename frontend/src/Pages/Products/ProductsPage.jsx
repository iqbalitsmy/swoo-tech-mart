import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../Components/Shared/Breadcrumb/Breadcrumb';

import PopularCategories from '../../Components/ProductsPage/PopularCategories';

import products from '../../utiles/products';
import Products from '../../Components/ProductsPage/Products';
import AllCategories from '../../Components/ProductsPage/AllCategories/AllCategories';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/Components/Shared/Pagination/Pagination';

const items = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Top Cell Phones & Tablets", href: "/shop/cellphones-tablets" }
]

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    // const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);  // NEW: tracks total page count from API
    const [totalItems, setTotalItems] = useState(0);  // NEW: total result count for the status line
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                // Pass the full query string — includes both filter params
                // (?category=Iphone&brand=samsung…) AND the page param (?page=2),
                // since AllCategories and Pagination both write to the same URL.
                // The API is expected to return:
                //   { products: [...], totalPages: number, totalItems: number }
                const res = await fetch(`/api/products?${searchParams.toString()}`);

                if (!res.ok) throw new Error(`Server error: ${res.status}`);

                const data = await res.json();

                // NEW: destructure pagination metadata from the response.
                // Adjust field names if your API uses different keys
                // (e.g. data.pages, data.count, data.pagination.total).
                // setProducts(data.products ?? []);
                setTotalPages(data.totalPages ?? 1);
                setTotalItems(data.totalItems ?? data.products?.length ?? 0);
            } catch (err) {
                setError(err.message);
                // setProducts([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams]); // re-fetches on every URL change (filter OR page change)

    const currentPage = Math.max(1, Number(searchParams.get('page') ?? 1));

    return (
        <div className='min-h-screen'>
            <section className='px-6'>
                <Breadcrumb items={items} />
            </section>
            {/* <section className='container mx-auto max-w-7xl'>
                <PopularCategories />
            </section> */}
            {/* Main content: sidebar + product grid */}
            <section className="container mx-auto mt-6 flex max-w-7xl flex-col gap-6 p-6  pb-12 rounded-xl bg-white shadow-sm lg:flex-row lg:items-start">
                {/* Sidebar — fixed width on desktop, full width on mobile */}
                <aside className="w-full shrink-0 lg:w-64 xl:w-72">
                    <AllCategories/>
                </aside>

                {/* Product grid */}
                <div className="flex-1 min-h-screen">

                    <p className="mb-4 text-sm text-gray-500">
                        {products.length} product{products.length !== 1 ? 's' : ''} found
                        {searchParams.get('category')
                            ? ` in "${searchParams.get('category')}"`
                            : ''}
                    </p>
                    {/* Result count / status line */}
                    {/* {!loading && !error && (
                        <p className="mb-4 text-sm text-gray-500">
                            {products.length} product{products.length !== 1 ? 's' : ''} found
                            {searchParams.get('category')
                                ? ` in "${searchParams.get('category')}"`
                                : ''}
                        </p>
                    )}

                    {loading && (
                        <p className="mb-4 text-sm text-gray-400">Loading products…</p>
                    )}

                    {error && (
                        <p className="mb-4 text-sm text-danger">
                            Failed to load products: {error}
                        </p>
                    )} */}

                    {/* CHANGED: Products just receives the fetched array — no
                        filtering happens here, the server already filtered it. */}
                    <Products products={products} />

                    {/* {!loading && !error && totalPages > 1 && ( */}
                    <div className="flex justify-center pt-4">
                        <Pagination totalPages={5} />
                    </div>
                    {/* )} */}
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;