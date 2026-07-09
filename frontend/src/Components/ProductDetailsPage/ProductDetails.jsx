import React from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import BuyBox from './Buybox';
import ProductDescription from './ProductDescription';
import CustomerFeedback from './CustomerFeedback';

const ProductDetails = ({ product }) => {
    return (
        <>
            <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 rounded-xl bg-white p-6 mb-6 shadow-sm lg:grid-cols-[1fr_1.2fr_0.8fr]">
                <ProductGallery images={product.images} isNew={product.isNew} />

                <ProductInfo product={product} />

                <BuyBox
                    promo={product.promo}
                    totalPrice={product.totalPrice}
                    installment={product.installment}
                    stock={product.stock}
                    wishlisted={product.wishlisted}
                    shipFromCountry={product.shipFromCountry}
                    supportPhone={product.supportPhone}
                />
            </section>
            <section className='container max-w-6xl mx-auto mb-6'>
                <div className='pl-6 p-4 bg-gray-100 rounded-t-xl'>
                    <h3 className='text-xl font-semibold'>Description</h3>
                </div>
                <ProductDescription description={product.description} />
            </section>

            <section className='container max-w-6xl mx-auto mb-6'>
                <CustomerFeedback feedback={product.feedback} />
            </section>
        </>
    );
};

export default ProductDetails;