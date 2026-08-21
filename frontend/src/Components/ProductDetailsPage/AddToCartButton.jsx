import { useAddToCart } from '@/hooks/useCart';
import React from 'react';

const AddToCartButton = ({
    productId,
    variantId,
    quantity,
    disabled = false,
    disabledLabel,
    onSuccess,
}) => {
    const { mutate: addToCart, isPending } = useAddToCart();

    const handleClick = () => {
        if (!productId || !variantId || disabled || isPending) return;
        
        addToCart(
            { productId, variantId, quantity },
            { onSuccess: () => onSuccess?.({ productId, variantId, quantity }) }
        );
    };

    const isDisabled = disabled || isPending || !variantId;

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isDisabled}
            className="w-full rounded-lg bg-primary py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-300"
        >
            {isPending ? "Adding…" : disabled ? disabledLabel : "Add to cart"}
        </button>
    );
};

export default AddToCartButton;