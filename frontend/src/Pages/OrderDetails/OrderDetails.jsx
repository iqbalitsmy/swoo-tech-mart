import React, { useState } from 'react';
import { MapPin, Loader2, AlertCircle, CreditCard } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useOrderDetails, useCancelOrder, useInitiatePayment } from '@/hooks/useOrders';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

const statusStyle = {
    PENDING: 'bg-gray-100 text-gray-600',
    CONFIRMED: 'bg-blue-50 text-blue-600',
    SHIPPED: 'bg-indigo-50 text-indigo-600',
    DELIVERED: 'bg-green-50 text-green-600',
    CANCELED: 'bg-gray-100 text-gray-600',
    REFUNDED: 'bg-purple-50 text-purple-600',
};

const statusLabel = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELED: 'Cancelled',
    REFUNDED: 'Refunded',
};

// Only PENDING orders are cancelable per the backend contract.
const CANCELABLE_STATUSES = ['PENDING'];

// An order is payable when it's still PENDING and its latest payment attempt
// hasn't succeeded — covers "never paid" (PENDING) and "card declined" (FAILED),
// but not SUCCEEDED (already paid) or terminal states like CANCELED/REFUNDED.
const PAYABLE_ORDER_STATUSES = ['PENDING'];
const UNPAID_PAYMENT_STATUSES = ['PENDING', 'FAILED'];

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

const formatDateTime = (iso) =>
    new Date(iso).toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: order, isLoading, isError, error } = useOrderDetails(id);
    const cancelOrder = useCancelOrder(id);
    const initiatePayment = useInitiatePayment();
    const [confirmOpen, setConfirmOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center gap-2 bg-gray-50 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading order...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto mt-10 max-w-md rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error?.response?.data?.message || 'Failed to load this order.'}
                </div>
            </div>
        );
    }

    const itemCount = order.items?.length ?? 0;
    const isCancelable = CANCELABLE_STATUSES.includes(order.status);
    const isPayable =
        order.paymentProvider === 'STRIPE' &&
        PAYABLE_ORDER_STATUSES.includes(order.status) &&
        UNPAID_PAYMENT_STATUSES.includes(order.latestPaymentStatus);

    const handleConfirmCancel = () => {
        cancelOrder.mutate(undefined, {
            onSuccess: () => setConfirmOpen(false),
            // Dialog stays open on failure so the user sees the inline error below.
        });
    };

    const handlePayNow = () => {
        initiatePayment.mutate(order.id, {
            onSuccess: (payment) => {
                if (!payment?.clientSecret) {
                    toast.error('Could not start payment. Please try again.');
                    return;
                }
                navigate(`/checkout/pay/${order.id}`, {
                    state: { clientSecret: payment.clientSecret, amount: payment.amount },
                });
            },
            onError: () => toast.error('Could not start payment. Please try again.'),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-5 text-2xl font-semibold text-gray-700">
                    Order Details
                </h1>

                {/* Items card */}
                <div className="rounded-md bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <span className="text-sm font-semibold text-gray-800">
                            {order.orderNumber}
                        </span>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[order.status] || 'bg-gray-100 text-gray-600'}`}
                        >
                            {statusLabel[order.status] ?? order.status}
                        </span>
                    </div>

                    {order.items?.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b border-gray-50 px-5 py-5 last:border-b-0">
                            <div className="h-20 w-20 shrink-0 rounded bg-gray-100" />

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-800">
                                    {item.productTitleSnapshot}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    SKU: {item.skuSnapshot}
                                </p>
                            </div>

                            <div className="shrink-0 text-right">
                                <p className="text-sm font-semibold text-gray-800">
                                    {formatTaka(item.unitPrice)}
                                </p>
                            </div>

                            <div className="shrink-0 text-right text-sm text-gray-500">
                                Qty: <span className="font-medium text-gray-700">{item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order meta + actions */}
                <div className="mt-4 flex items-center justify-between rounded-md bg-white px-5 py-4 shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            Order {order.orderNumber}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                            Placed on {formatDateTime(order.createdAt)}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {isPayable && (
                            <button
                                onClick={handlePayNow}
                                disabled={initiatePayment.isPending}
                                className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
                            >
                                {initiatePayment.isPending ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <CreditCard className="h-3.5 w-3.5" />
                                )}
                                {initiatePayment.isPending ? 'Starting...' : 'Pay Now'}
                            </button>
                        )}

                        {isCancelable && (
                            <button
                                onClick={() => setConfirmOpen(true)}
                                className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                </div>

                {/* Address + Total summary */}
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {order.shippingSnapshot?.recipientName}
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    {
                                        [
                                            order.shippingSnapshot?.line1,
                                            order.shippingSnapshot?.line2,
                                            order.shippingSnapshot?.city,
                                            order.shippingSnapshot?.state,
                                            order.shippingSnapshot?.postalCode,
                                        ].filter(Boolean).join(', ')
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Total Summary
                        </h2>

                        <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})</span>
                                <span className="text-gray-700">{formatTaka(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping Fee</span>
                                <span className="text-gray-700">{formatTaka(order.shippingFee)}</span>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Total</span>
                                <span className="text-base font-bold text-primary">
                                    {formatTaka(order.totalAmount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Payment</span>
                                <span className="text-gray-700">
                                    {order.paymentProvider} — {statusLabel[order.latestPaymentStatus] ?? order.latestPaymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel confirmation dialog */}
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cancel this order?</DialogTitle>
                        <DialogDescription>
                            Order <span className="font-medium text-gray-700">{order.orderNumber}</span> will be
                            cancelled and reserved stock will be released. This can't be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {cancelOrder.isError && (
                        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {cancelOrder.error?.response?.data?.message || 'Could not cancel this order. Please try again.'}
                        </div>
                    )}

                    <DialogFooter>
                        <button
                            onClick={() => setConfirmOpen(false)}
                            disabled={cancelOrder.isPending}
                            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Keep Order
                        </button>
                        <button
                            onClick={handleConfirmCancel}
                            disabled={cancelOrder.isPending}
                            className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
                        >
                            {cancelOrder.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            {cancelOrder.isPending ? 'Cancelling...' : 'Yes, Cancel Order'}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OrderDetails;