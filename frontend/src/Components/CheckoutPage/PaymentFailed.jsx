import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailed = ({ orderId }) => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
            <XCircle className="h-12 w-12 text-red-500" />
            <h1 className="text-lg font-bold text-gray-800">Payment failed</h1>
            <p className="max-w-sm text-sm text-gray-500">
                Your payment could not be completed. No charge was made — your order is still saved and
                you can retry from the order page.
            </p>
            <div className="mt-2 flex gap-3">
                {orderId && (
                    <button
                        onClick={() => navigate(`/orders/${orderId}`)}
                        className="rounded-md cursor-pointer bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                    >
                        View Order
                    </button>
                )}
                <button
                    onClick={() => navigate('/checkout')}
                    className="rounded-md cursor-pointer border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                    Back to Checkout
                </button>
            </div>
        </div>
    );
};

export default PaymentFailed;