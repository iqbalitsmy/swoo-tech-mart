import React from 'react';
import ProductCard from '../Shared/Main/ProductCard/ProductCard';

const Products = ({ products }) => {
    return (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {
                products.map((product, i) => (
                    <ProductCard key={i} product={product} />
                ))
            }
        </div>
    );
};

export default Products;