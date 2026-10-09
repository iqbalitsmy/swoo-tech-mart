import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingBag, Users } from "lucide-react";
import { Link } from "react-router-dom";

// import { getAdminOrders, getAdminUsers } from "@/api/adminApi";
import { getProductsRequest } from "@/api/productsApi";
import {
  statusClass,
} from "../../Components/Shared/Admin/adminUi";
import { getAdminOrders } from "@/api/adminApi/orders";
import { getAdminUsers } from "@/api/adminApi/users";
import PageHeader from "@/Components/Shared/Admin/PageHeader/PageHeader";
import Feedback from "@/Components/Shared/Feedback/Feedback";
import { formateMoney } from "@/utils/formateMoney";

export default function AdminDashboard() {
  const users = useQuery({
    queryKey: ["admin", "users", "summary"],
    queryFn: () =>
      getAdminUsers({
        page: 0,
        size: 1,
      }),
  });

  const orders = useQuery({
    queryKey: ["admin", "orders", "summary"],
    queryFn: () =>
      getAdminOrders({
        page: 0,
        size: 5,
      }),
  });

  const products = useQuery({
    queryKey: ["products", "summary"],
    queryFn: () =>
      getProductsRequest({
        page: 0,
        size: 1,
      }),
  });


  const stats = [
    [
      "Users",
      users.data?.totalElements ?? "—",
      Users,
      "/admin/users",
    ],
    [
      "Products",
      products.data?.totalElements ?? "—",
      Package,
      "/admin/products",
    ],
    [
      "Orders",
      orders.data?.totalElements ?? "—",
      ShoppingBag,
      "/admin/orders",
    ],
  ];

  return (
    <div>
      <PageHeader
        title="Overview"
        description="A quick view of your store administration."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([label, value, Icon, to]) => (
          <Link
            key={label}
            to={to}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-primary/50"
          >
            <Icon className="h-5 w-5 text-primary" />

            <p className="mt-4 text-2xl font-bold text-gray-800">
              {value}
            </p>

            <p className="text-sm text-gray-500">
              {label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800">
          Recent orders
        </h3>

        <Feedback
          loading={orders.isLoading}
          error={orders.error}
          empty={!orders.data?.content?.length}
        >
          <div className="mt-4 divide-y">
            {orders.data?.content?.map((order) => (
              <div
                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
                key={order.id}
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {order.orderNumber}
                  </p>

                  <p className="text-xs text-gray-400">
                    {order.userEmail}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[order.status]}`}
                >
                  {order.status}
                </span>

                <p className="font-semibold text-primary">
                  {formateMoney(order.totalAmount)}
                </p>
              </div>
            ))}
          </div>
        </Feedback>
      </div>
    </div>
  );
}