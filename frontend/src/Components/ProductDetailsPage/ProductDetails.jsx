import React, { useMemo, useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import BuyBox from './Buybox';
import ProductDescription from './ProductDescription';
import CustomerFeedback from './CustomerFeedback';

const ProductDetails = ({ product }) => {
    const [selectedVariant, setSelectedVariant] = useState(null);
    
    const galleryImages = useMemo(() => {
        const source = selectedVariant?.images?.length ? selectedVariant?.images : product.images;

        return [...(source ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVariant?.id, product.images]);


    return (
        <>
            <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 rounded-xl bg-white p-6 mb-6 shadow-sm lg:grid-cols-[1fr_1.2fr_0.8fr]">
                <ProductGallery images={galleryImages} isNew={product?.isNew} />

                <ProductInfo product={product} selectedVariant={selectedVariant} />

                <BuyBox
                    product={product}
                    onVariantChange={setSelectedVariant}
                    supportPhone={"(025) 3886 25 16"}
                    onAddToCart={({ variantId, quantity }) => {
                        console.log('add to cart', variantId, quantity);
                    }}
                    onBuyNow={({ variantId, quantity }) => {
                        console.log('buy now', variantId, quantity);
                    }}
                />

            </section>
            <section className='container max-w-6xl mx-auto mb-6'>
                <div className='pl-6 p-4 bg-gray-100 rounded-t-xl'>
                    <h3 className='text-xl font-semibold'>Description</h3>
                </div>
                <ProductDescription descriptions={product?.descriptions} />
            </section>

            <section className='container max-w-6xl mx-auto mb-6'>
                <CustomerFeedback id={product.id} />
            </section>
        </>
    );
};

export default ProductDetails;