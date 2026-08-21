import React from 'react';
import Breadcrumb from '../../Components/Shared/Breadcrumb/Breadcrumb';
import Products from '../../Components/ProductsPage/Products';
import AllCategories from '../../Components/ProductsPage/AllCategories/AllCategories';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/Components/Shared/Pagination/Pagination';
import { useGetProducts } from '@/hooks/useProduct';

const items = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" }
];

const ProductsPage = () => {
    const [searchParams] = useSearchParams();

    // Pull every filter/pagination value straight from the URL so the hook's
    // queryKey changes whenever any of them change — that's what triggers refetch.
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const tag = searchParams.get('tag');
    const minPrice = searchParams.get('minPrice') || undefined;
    const maxPrice = searchParams.get('maxPrice') || undefined;
    const stockStatus = searchParams.get('stockStatus');
    const isNew = searchParams.get('isNew') || undefined;
    const sort = searchParams.get('sort') || undefined;
    const page = searchParams.get('page') || undefined;
    const size = searchParams.get('size') || undefined;
    const q = searchParams.get('q') || undefined;

    const { data, isLoading, isError, error } = useGetProducts(
        category, brand, tag, minPrice, maxPrice, stockStatus, isNew, sort, page, size, q
    );

    // CHANGED: axiosInstance's response interceptor already strips the
    // { success, message, data } envelope (see axios.js's unwrapEnvelope),
    // so `data` from useGetProducts IS the PageResponse directly - there's
    // no second `.data` layer to dig through here. The previous `data?.data`
    // would always have resolved to undefined.
    const productList = data?.content ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalItems = data?.totalElement ?? 0;


    return (
        <div className='min-h-screen'>
            <section className='px-6'>
                <Breadcrumb items={items} />
            </section>

            <section className="container mx-auto mt-6 flex max-w-7xl flex-col gap-6 p-6 pb-12 rounded-xl bg-white shadow-sm lg:flex-row lg:items-start">
                <aside className="w-full shrink-0 lg:w-64 xl:w-72">
                    <AllCategories />
                </aside>

                <div className="flex-1 min-h-screen">
                    {isLoading && (
                        <p className="mb-4 text-sm text-gray-400">Loading products…</p>
                    )}

                    {isError && (
                        <p className="mb-4 text-sm text-danger">
                            Failed to load products: {error?.message}
                        </p>
                    )}

                    {!isLoading && !isError && (
                        <>
                            <p className="mb-4 text-sm text-gray-500">
                                {totalItems} product{totalItems !== 1 ? 's' : ''} found
                                {category ? ` in "${category}"` : ''}
                            </p>

                            <Products products={productList} />

                            {
                                totalPages > 1 && (
                                    <div className="flex justify-center pt-4">
                                        <Pagination totalPages={totalPages} />
                                    </div>
                                )
                            }
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;