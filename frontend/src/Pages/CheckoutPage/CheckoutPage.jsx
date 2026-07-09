import React, { useState } from 'react';
import {
    MapPin,
    Plus,
    Check,
    Wallet,
    CreditCard,
    Landmark,
    Truck,
} from 'lucide-react';
import AddAddressDialog from '@/Components/CheckoutPage/AddAddressDialog';

const initialAddresses = [
    {
        id: 1,
        label: 'Home',
        name: 'Mark Cole',
        phone: '+1 0231 4554 452',
        address: '123 Green Road, Dhanmondi, Dhaka 1209',
    },
    {
        id: 2,
        label: 'Office',
        name: 'Mark Cole',
        phone: '+1 0231 4554 452',
        address: 'Level 4, Gulshan Avenue, Dhaka 1212',
    },
];

const cartItems = [
    { id: 1, name: 'HP ProBook 450 G6 Core i5 8th Gen 256GB SSD Laptop', qty: 1, price: 36500 },
    { id: 2, name: 'Lenovo ThinkPad 13 (2nd Gen) 4GB RAM 128GB SSD', qty: 2, price: 18500 },
];

const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Truck },
    { id: 'card', label: 'Debit / Credit Card', desc: 'Visa, Mastercard, Amex', icon: CreditCard },
    { id: 'mobile', label: 'Mobile Banking', desc: 'bKash, Nagad, Rocket', icon: Wallet },
    { id: 'bank', label: 'Bank Transfer', desc: 'Direct transfer to our account', icon: Landmark },
];

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

/* ---------- Reusable radio-style selector control ---------- */
const RadioDot = ({ selected }) => (
    <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${selected ? 'border-primary' : 'border-gray-300'
            }`}
    >
        {selected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </div>
);


const CheckoutPage = () => {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0].id);
    const [selectedPayment, setSelectedPayment] = useState('cod');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSaveAddress = (newAddress) => {
        setAddresses((prev) => [...prev, newAddress]);
        setSelectedAddress(newAddress.id);
        setDialogOpen(false);
    };

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingFee = 195;
    const total = subtotal + shippingFee;

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <h1 className="mb-5 text-xl font-bold text-gray-800">Checkout</h1>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                {/* ---------- Left column ---------- */}
                <div className="space-y-4">
                    {/* Delivery address */}
                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-800">
                                Delivery Address
                            </h2>
                            <button
                                onClick={() => setDialogOpen(true)}
                                className="flex items-center gap-1.5 text-xs font-semibold uppercase text-primary hover:underline"
                            >
                                <Plus className="h-3.5 w-3.5" />
                                Add New Address
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            {
                                addresses.map((addr) => (
                                    <label
                                        key={addr.id}
                                        className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${selectedAddress === addr.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="address"
                                            checked={selectedAddress === addr.id}
                                            onChange={() => setSelectedAddress(addr.id)}
                                            className="sr-only"
                                        />
                                        {/* <RadioDot selected={selectedAddress === addr.id} /> */}
                                        {/* Radio button */}
                                        <div
                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${selectedAddress === addr.id ? 'border-primary' : 'border-gray-300'
                                                }`}
                                        >
                                            {selectedAddress === addr.id && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-primary" />
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {addr.label}
                                                </p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {addr.name} · {addr.phone}
                                            </p>
                                            <p className="text-sm text-gray-400">{addr.address}</p>
                                        </div>
                                    </label>
                                ))
                            }

                            {addresses.length === 0 && (
                                <div className="rounded-md border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
                                    No saved addresses. Add one to continue.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-base font-semibold text-gray-800">
                            Payment Method
                        </h2>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {paymentMethods.map((method) => {
                                const Icon = method.icon;
                                const selected = selectedPayment === method.id;
                                return (
                                    <label
                                        key={method.id}
                                        className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${selected
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={selected}
                                            onChange={() => setSelectedPayment(method.id)}
                                            className="sr-only"
                                        />
                                        {/* radio button */}
                                        <div
                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${selected ? 'border-primary' : 'border-gray-300'
                                                }`}
                                        >
                                            {selected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <Icon className="h-4 w-4 text-gray-500" />
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {method.label}
                                                </p>
                                            </div>
                                            <p className="mt-0.5 text-xs text-gray-400">
                                                {method.desc}
                                            </p>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order items preview */}
                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-base font-semibold text-gray-800">
                            Items ({cartItems.length})
                        </h2>
                        <div className="mt-3 divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between py-3 text-sm"
                                >
                                    <p className="pr-4 text-gray-700">
                                        {item.name}{' '}
                                        <span className="text-gray-400">x{item.qty}</span>
                                    </p>
                                    <p className="shrink-0 font-medium text-gray-800">
                                        {formatTaka(item.price * item.qty)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---------- Order summary sidebar ---------- */}
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
                        <span className="text-lg font-bold text-primary">
                            {formatTaka(total)}
                        </span>
                    </div>

                    <button
                        type="button"
                        disabled={!selectedAddress}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Check className="h-4 w-4" />
                        PLACE ORDER
                    </button>

                    <p className="mt-3 text-center text-xs text-gray-400">
                        By placing your order, you agree to our Terms & Conditions
                    </p>
                </div>
            </div>

            {dialogOpen && (
                <AddAddressDialog
                    onClose={() => setDialogOpen(false)}
                    onSave={handleSaveAddress}
                />
            )}
        </div>
    );
};

export default CheckoutPage;