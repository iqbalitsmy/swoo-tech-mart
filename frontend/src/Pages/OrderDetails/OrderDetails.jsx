import React from 'react';
import { Store, MessageCircle, MapPin } from 'lucide-react';

const orderData = {
    id: '67867541286800',
    placedDate: '27 Sep 2025 13:06:06',
    status: 'Cancelled',
    seller: 'Western Gadgets',
    item: {
        name: 'iPhone XR Liquid Silicone Phone Case: Premium Liquid Silicone Back Cover - Durable and Very Reliable - Phone',
        variant: 'Color Family: Lite Violet',
        price: 189,
        qty: 1,
        image:
            'https://images.unsplash.com/photo-1592286927505-1def25115558?w=200&q=80',
        status: 'Cancelled',
    },
    address: {
        label: 'HOME',
        name: 'Iqbal Hossain',
        line: 'Chatkhil Bodalcourt, Islampur, Muraim, Manikpur, Bangladesh',
        phone: '01778955094',
    },
    subtotal: 189,
    shippingFee: 150,
    total: 339,
    paidBy: null,
};

const statusStyle = {
    Cancelled: 'bg-gray-100 text-gray-600',
    Delivered: 'bg-green-50 text-green-600',
    Processing: 'bg-amber-50 text-amber-600',
    Shipped: 'bg-blue-50 text-blue-600',
};

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

const OrderDetails = () => {
    const order = orderData;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-5 text-2xl font-semibold text-gray-700">
                    Order Details
                </h1>

                {/* Seller + item card */}
                <div className="rounded-md bg-white shadow-sm">
                    {/* Seller header */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <Store className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-semibold text-gray-800">
                                {order.seller}
                            </span>
                            <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                                <MessageCircle className="h-4 w-4" />
                                Chat with Seller
                            </button>
                        </div>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[order.status] || 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {order.status}
                        </span>
                    </div>

                    {/* Item row */}
                    <div className="flex gap-4 px-5 py-5">
                        <img
                            src={order.item.image}
                            alt={order.item.name}
                            className="h-20 w-20 shrink-0 rounded object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800">
                                {order.item.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                {order.item.variant}
                            </p>
                            <p className="mt-1 text-xs">
                                <span className="text-gray-500">{order.item.status}</span>
                                {' - '}
                                <button className="font-medium text-primary hover:underline">
                                    MORE DETAILS
                                </button>
                            </p>
                        </div>

                        <div className="shrink-0 text-right">
                            <p className="text-sm font-semibold text-gray-800">
                                {formatTaka(order.item.price)}
                            </p>
                        </div>

                        <div className="shrink-0 text-right text-sm text-gray-500">
                            Qty: <span className="font-medium text-gray-700">{order.item.qty}</span>
                        </div>
                    </div>
                </div>

                {/* Order meta */}
                <div className="mt-4 rounded-md bg-white px-5 py-4 shadow-sm">
                    <p className="text-sm font-medium text-gray-700">
                        Order {order.id}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                        Placed on {order.placedDate}
                    </p>
                </div>

                {/* Address + Total summary */}
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Delivery address */}
                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {order.address.name}
                                </p>

                                <div className="mt-2 flex items-start gap-2">
                                    <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                                        {order.address.label}
                                    </span>
                                    <p className="text-sm text-gray-600">
                                        {order.address.line}
                                    </p>
                                </div>

                                <p className="mt-3 text-sm text-gray-600">
                                    {order.address.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Total summary */}
                    <div className="rounded-md bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Total Summary
                        </h2>

                        <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal (1 Item)</span>
                                <span className="text-gray-700">
                                    {formatTaka(order.subtotal)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping Fee</span>
                                <span className="text-gray-700">
                                    {formatTaka(order.shippingFee)}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Total</span>
                                <span className="text-base font-bold text-primary">
                                    {formatTaka(order.total)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Paid by</span>
                                <span className="text-gray-700">
                                    {order.paidBy || '—'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;