import React, { useState } from 'react';
import { Check, Wallet, CreditCard, Landmark, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import CheckoutAddressSection from '@/Components/CheckoutPage/CheckoutAddressSection';
import { useCreateOrder } from '@/hooks/useOrders';
import { useGetCart } from '@/hooks/useCart';

const paymentMethods = [
    { id: 'STRIPE', label: 'Debit / Credit Card', desc: 'Visa, Mastercard, Amex', icon: CreditCard },
    { id: 'COD', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Truck },
    { id: 'MOBILE', label: 'Mobile Banking', desc: 'bKash, Nagad, Rocket', icon: Wallet },
    { id: 'BANK', label: 'Bank Transfer', desc: 'Direct transfer to our account', icon: Landmark },
];

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

const CheckoutPage = () => {
    const navigate = useNavigate();

    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState('STRIPE');

    const { data: cart, isLoading: isCartLoading } = useGetCart({ enabled: false });
    const cartItems = cart?.items ?? [];
    const subtotal = cart?.subtotal ?? 0;

    const createOrder = useCreateOrder();

    const shippingFee = 195; // TODO: pull from /api/checkout/summary once that's wired in
    const total = subtotal + shippingFee;

    const handlePlaceOrder = () => {
        if (!selectedAddressId) return;

        createOrder.mutate(
            { shippingAddressId: selectedAddressId, paymentProvider: selectedPayment },
            {
                onSuccess: ({ order, payment }) => {
                    if (selectedPayment !== 'STRIPE') {
                        toast.success('Order placed');
                        navigate(`/orders/${order.id}`);
                        return;
                    }
                    navigate(`/checkout/pay/${order.id}`, {
                        state: payment?.clientSecret
                            ? { clientSecret: payment.clientSecret, amount: payment.amount }
                            : undefined,
                    });
                },
                onError: () => toast.error('Could not place order. Please try again.'),
            }
        );
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <h1 className="mb-5 text-xl font-bold text-gray-800">Checkout</h1>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                <div className="space-y-4">
                    <CheckoutAddressSection
                        selectedAddressId={selectedAddressId}
                        onSelectAddress={setSelectedAddressId}
                    />

                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-base font-semibold text-gray-800">Payment Method</h2>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {paymentMethods.map((method) => {
                                const Icon = method.icon;
                                const selected = selectedPayment === method.id;
                                return (
                                    <label
                                        key={method.id}
                                        className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${selected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={selected}
                                            onChange={() => setSelectedPayment(method.id)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${selected ? 'border-primary' : 'border-gray-300'
                                                }`}
                                        >
                                            {selected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <Icon className="h-4 w-4 text-gray-500" />
                                                <p className="text-sm font-semibold text-gray-800">{method.label}</p>
                                            </div>
                                            <p className="mt-0.5 text-xs text-gray-400">{method.desc}</p>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-base font-semibold text-gray-800">Items ({cartItems.length})</h2>

                        {isCartLoading && (
                            <p className="mt-3 text-sm text-gray-400">Loading cart...</p>
                        )}

                        {!isCartLoading && cartItems.length === 0 && (
                            <p className="mt-3 text-sm text-gray-400">Your cart is empty.</p>
                        )}

                        <div className="mt-3 divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-3 text-sm">
                                    <p className="pr-4 text-gray-700">
                                        {item.productTitle} <span className="text-gray-400">x{item.quantity}</span>
                                    </p>
                                    <p className="shrink-0 font-medium text-gray-800">{formatTaka(item.lineTotal)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="h-fit rounded-md bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                    <div className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span className="text-gray-700">{formatTaka(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Shipping Fee</span>
                            <span className="text-gray-700">{formatTaka(shippingFee)}</span>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-base font-medium text-gray-800">Total</span>
                        <span className="text-lg font-bold text-primary">{formatTaka(total)}</span>
                    </div>

                    <button
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={!selectedAddressId || createOrder.isPending || cartItems.length === 0}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Check className="h-4 w-4" />
                        {createOrder.isPending ? 'Placing order...' : 'PLACE ORDER'}
                    </button>

                    <p className="mt-3 text-center text-xs text-gray-400">
                        By placing your order, you agree to our Terms & Conditions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;