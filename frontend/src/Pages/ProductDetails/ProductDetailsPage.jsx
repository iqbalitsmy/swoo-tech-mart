import React, { useEffect } from 'react';
import Breadcrumb from '../../Components/Shared/Breadcrumb/Breadcrumb';
import ProductDetails from '../../Components/ProductDetailsPage/ProductDetails';

import ProductCarousel from '../../Components/Shared/ProductCarousel/ProductCarousel';
import RecentlyViewedSection from '../../Components/Shared/RecentlyView/RecentlyViewedSection';
import { useGetProduct, useGetRelatedProduct } from '@/hooks/useProduct';
import { useParams } from 'react-router-dom';
import { recordRecentlyViewRequest } from '@/api/recentlyViewApi';
import { useGetRecentlyViewProduct } from '@/hooks/useRecentlyView';


const ProductDetailsPage = () => {
    const { slug } = useParams();

    const { data: product, isLoading, isError, error } = useGetProduct(slug);

    const { data: relatedProducts, isError: isRelatedProductLoading } = useGetRelatedProduct(product?.id);


    const items = [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/products" },
        { label: product?.category?.name, href: `/products/?category=${product?.category?.slug}` },
        { label: product?.title },
    ]

    useEffect(() => {
        if (!product?.id) return;

        recordRecentlyViewRequest(product.id).catch((err) => {
            console.error('Failed to record recently viewed product:', err);
        });
    }, [product])

    return (
        <div className='min-h-screen'>
            {
                isLoading && (
                    <p className="mb-4 text-sm text-gray-400">Loading products…</p>
                )
            }

            {
                isError && (
                    <p className="mb-4 text-sm text-danger">
                        Failed to load products: {error?.message}
                    </p>
                )
            }
            {
                !isLoading && !isError && (
                    <>
                        <Breadcrumb items={items} />

                        <ProductDetails product={product} />

                        {
                            !isRelatedProductLoading && (
                                <section className='container max-w-6xl mx-auto mb-6'>
                                    <ProductCarousel products={relatedProducts} viewAllHref={`/products/?category=${product?.category?.slug}`}
                                        isRelatedProductLoading={isRelatedProductLoading} title={"Related Products"} />
                                </section>
                            )
                        }

                        {

                            <section className='container max-w-6xl mx-auto mb-6'>
                                <RecentlyViewedSection excludeProductId={product?.id} />
                            </section>
                        }
                    </>

                )
            }

        </div>
    );
};

export default ProductDetailsPage;