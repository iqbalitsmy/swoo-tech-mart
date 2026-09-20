import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useInitiatePayment } from '@/hooks/useOrders';
import StripeProvider from '@/components/CheckoutPage/StripeProvider';
import StripePaymentForm from '@/components/CheckoutPage/StripePaymentForm';

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

const PaymentPage = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const initiatePayment = useInitiatePayment();

    const stateSession = location.state?.clientSecret
        ? { clientSecret: location.state.clientSecret, amount: location.state.amount }
        : null;

    useEffect(() => {
        if (stateSession || !orderId) return;
        initiatePayment.mutate(orderId, {
            onError: () => toast.error('Could not start payment for this order.'),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    const session = stateSession ?? (initiatePayment.data
        ? { clientSecret: initiatePayment.data.clientSecret, amount: initiatePayment.data.amount }
        : null);

    if (!session) {
        if (initiatePayment?.isError) {
            return (
                <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
                    <p className="text-sm text-gray-500">Could not start payment for this order.</p>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="rounded-md cursor-pointer bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                    >
                        Back to Checkout
                    </button>
                </div>
            );
        }
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm">Starting secure payment...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-md px-4 py-10">
            <h1 className="mb-5 text-lg font-bold text-gray-800">Complete Payment</h1>
            <div className="rounded-md bg-white p-5 shadow-sm">
                <StripeProvider clientSecret={session.clientSecret}>
                    <StripePaymentForm
                        orderId={orderId}
                        amount={formatTaka(session.amount)}
                        onCancel={() => navigate(`/account/order-details/${orderId}`)}
                    />
                </StripeProvider>
            </div>
        </div>
    );
};

export default PaymentPage;