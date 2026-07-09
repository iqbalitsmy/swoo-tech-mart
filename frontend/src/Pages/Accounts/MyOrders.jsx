import React from 'react';
import { Package } from 'lucide-react';

const orders = [
    { id: 'ORD-10234', date: 'Jun 28, 2026', status: 'Delivered', total: 36500 },
    { id: 'ORD-10198', date: 'Jun 12, 2026', status: 'Processing', total: 18500 },
];

const statusStyle = {
    Delivered: 'bg-green-50 text-green-600',
    Processing: 'bg-amber-50 text-amber-600',
    Cancelled: 'bg-red-50 text-red-500',
};

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

const MyOrders = () => {
    return (
        <div>
            <h1 className="text-lg font-bold text-gray-800">My Orders</h1>

            <div className="mt-5 space-y-3">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="flex items-center justify-between rounded-md border border-gray-200 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <Package className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {order.id}
                                </p>
                                <p className="text-xs text-gray-400">{order.date}</p>
                            </div>
                        </div>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[order.status]
                                }`}
                        >
                            {order.status}
                        </span>

                        <p className="text-sm font-semibold text-primary">
                            {formatTaka(order.total)}
                        </p>
                    </div>
                ))}

                {orders.length === 0 && (
                    <div className="rounded-md border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
                        You haven't placed any orders yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;