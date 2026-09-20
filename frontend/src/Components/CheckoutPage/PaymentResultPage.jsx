import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFailed';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Single funnel for both confirmation paths: Stripe appends
// payment_intent_client_secret + redirect_status here after a redirect-based
// confirmation (3DS, wallets); StripePaymentForm sends us here manually for
// non-redirect confirmations too. Either way we re-verify status against
// Stripe directly rather than trusting the URL, then hand off to /orders/:id.
const PaymentResultPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('checking');

    const orderId = searchParams.get('orderId');
    const clientSecret = searchParams.get('payment_intent_client_secret');

    useEffect(() => {
        let cancelled = false;

        const resolveStatus = async () => {
            if (!clientSecret) {
                if (!cancelled) setStatus('failed');
                return;
            }

            const stripe = await stripePromise;
            const { paymentIntent, error } = await stripe.retrievePaymentIntent(clientSecret);
            console.log(error?.message)
            console.log(paymentIntent)

            if (cancelled) return;

            if (error || !paymentIntent) {
                setStatus('failed');
                return;
            }
            console.log("Result page")
            console.log(status)

            if (paymentIntent.status === 'succeeded') setStatus('succeeded');
            else if (paymentIntent.status === 'processing') setStatus('processing');
            else setStatus('failed');
        };

        resolveStatus();
        return () => {
            cancelled = true;
        };
    }, [clientSecret]);

    useEffect(() => {
        if ((status === 'succeeded' || status === 'processing') && orderId) {
            const timer = setTimeout(() => navigate(`/account/order-details/${orderId}`, { replace: true }), 1500);
            return () => clearTimeout(timer);
        }
    }, [status, orderId, navigate]);

    if (status === 'checking') {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm">Confirming your payment...</p>
            </div>
        );
    }
    
    if (status === 'succeeded' || status === 'processing') {
        return <PaymentSuccess processing={status === 'processing'} />;
    }
    console.log(status)

    return <PaymentFailed orderId={orderId} />;
};

export default PaymentResultPage;