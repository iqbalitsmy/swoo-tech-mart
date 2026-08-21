import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const PaymentSuccess = ({ processing = false }) => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h1 className="text-lg font-bold text-gray-800">
            {processing ? 'Payment processing' : 'Payment successful'}
        </h1>
        <p className="text-sm text-gray-500">Redirecting to your order...</p>
    </div>
);

export default PaymentSuccess;