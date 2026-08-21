import React, { useMemo } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Module-level singleton — loadStripe must only be called once per
// publishable key, not on every render/mount.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeProvider = ({ clientSecret, children }) => {
    const options = useMemo(
        () => ({
            clientSecret,
            appearance: {
                theme: 'stripe',
                variables: {
                    colorPrimary: '#16a34a', // TODO: match your primary token's hex
                },
            },
        }),
        [clientSecret]
    );

    if (!clientSecret) return null;

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
};

export default StripeProvider;