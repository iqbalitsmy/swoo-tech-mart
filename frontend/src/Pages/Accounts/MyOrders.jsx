import React, { useState } from 'react';
import { Package, Loader2, AlertCircle } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { Link } from 'react-router-dom';

const statusStyle = {
    PENDING: 'bg-gray-50 text-gray-600',
    CONFIRMED: 'bg-blue-50 text-blue-600',
    SHIPPED: 'bg-indigo-50 text-indigo-600',
    DELIVERED: 'bg-green-50 text-green-600',
    CANCELED: 'bg-red-50 text-red-500',
    REFUNDED: 'bg-purple-50 text-purple-600',
};

const statusLabel = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELED: 'Canceled',
    REFUNDED: 'Refunded',
};

const formatTaka = (n) => `৳ ${n.toLocaleString('en-US')}`;

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const PAGE_SIZE = 10;

const MyOrders = () => {
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState(undefined); // undefined = all statuses

    const { data, isLoading, isError, error } = useOrders({ page, size: PAGE_SIZE, status });

    const orders = data?.content ?? [];
    const totalPages = data?.totalPages ?? 0;

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold text-gray-800">My Orders</h1>

                <select
                    value={status ?? ''}
                    onChange={(e) => {
                        setStatus(e.target.value || undefined);
                        setPage(0); // reset pagination whenever the filter changes
                    }}
                    className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600"
                >
                    <option value="">All statuses</option>
                    {
                        Object.keys(statusLabel).map((s) => (
                            <option key={s} value={s}>{statusLabel[s]}</option>
                        ))
                    }
                </select>
            </div>

            <div className="mt-5 space-y-3">
                {
                    isLoading && (
                        <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-400">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading orders...
                        </div>
                    )
                }

                {
                    isError && (
                        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            {error?.response?.data?.message || 'Failed to load orders. Please try again.'}
                        </div>
                    )
                }

                {
                    !isLoading && !isError && orders.map((order) => (
                        <Link
                            to={`/account/order-details/${order.id}`}
                            key={order.id}
                        >
                            <div
                                className="flex items-center justify-between rounded-md border border-gray-200 p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <Package className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{order.orderNumber ?? order.id}</p>
                                        <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>

                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[order.status]}`}>
                                    {statusLabel[order.status] ?? order.status}
                                </span>

                                <p className="text-sm font-semibold text-primary">
                                    {formatTaka(order.totalAmount)}
                                </p>
                            </div>
                        </Link>
                    ))
                }

                {
                    !isLoading && !isError && orders.length === 0 && (
                        <div className="rounded-md border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
                            You haven't placed any orders yet.
                        </div>
                    )
                }
            </div>

            {
                !isLoading && !isError && totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-3 text-sm">
                        <button
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="rounded-md border border-gray-200 px-3 py-1 disabled:opacity-40"
                        >
                            Prev
                        </button>
                        <span className="text-gray-500">Page {page + 1} of {totalPages}</span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={page >= totalPages - 1}
                            className="rounded-md border border-gray-200 px-3 py-1 disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default MyOrders;