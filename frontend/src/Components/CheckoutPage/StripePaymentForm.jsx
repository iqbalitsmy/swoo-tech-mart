import React, { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Loader2, Lock } from 'lucide-react';

const StripePaymentForm = ({ orderId, amount, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return; // Elements hasn't finished mounting yet

        setIsSubmitting(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // orderId travels as a query param since Stripe only accepts
                // one static return_url — the resolver page reads it back out.
                return_url: `${window.location.origin}/checkout/payment-result?orderId=${orderId}`,
            },
        });

        // This branch only runs for immediate failures (declined card) or
        // payment methods that never redirect (most cards). If confirmPayment
        // resolves without error, the PaymentIntent already succeeded and
        // Stripe won't navigate us anywhere — we do it ourselves below.
        if (error) {
            setErrorMessage(error.message ?? 'Payment failed. Please try again.');
            setIsSubmitting(false);
            return;
        }

        window.location.href = `/checkout/payment-result?orderId=${orderId}`;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement options={{ layout: 'tabs' }} />

            {errorMessage && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{errorMessage}</p>
            )}

            <div className="flex gap-3 pt-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="flex-1 rounded-md cursor-pointer border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                    >
                        Back
                    </button>
                )}
                <button
                    type="submit"
                    disabled={!stripe || isSubmitting}
                    className="flex flex-1 items-center justify-center gap-2 rounded-md cursor-pointer bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Lock className="h-3.5 w-3.5" />
                            Pay {amount}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default StripePaymentForm;