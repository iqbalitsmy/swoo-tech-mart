import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


import PageHeader from "@/Components/Shared/Admin/PageHeader/PageHeader";
import Feedback from "@/Components/Shared/Feedback/Feedback";
import Pager from "@/Components/Shared/Pager/Pager";
import { formateMoney } from "@/utils/formateMoney";
import { useAdminProductsQuery, useDeleteAdminProduct } from "@/hooks/admin/useAdminProducts";

export default function AdminProducts() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");

  const products = useAdminProductsQuery({ page, q });
  const remove = useDeleteAdminProduct();

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(0);
    setQ(search.trim());
  }

  function handleDelete(product) {
    if (window.confirm(`Delete ${product.title}?`)) {
      remove.mutate(product.id);
    }
  }

  return (
    <div>
      <PageHeader
        title="Products"
        description="Create, update, and remove catalog products."
        action={
          <div className="flex gap-2">
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex">
              <input
                value={search}
                onChange={handleSearchChange}
                placeholder="Search…"
                className="w-36 rounded-l-md border border-gray-200 px-3 text-sm"
              />

              <button
                type="submit"
                className="rounded-r-md bg-primary px-3 text-white"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <Link
              to="/admin/products/new"
              className="flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              Add product
            </Link>
          </div>
        }
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <Feedback
          loading={products.isLoading}
          error={products.error}
          empty={!products.data?.content?.length}
        >
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.data?.content?.map((product) => (
                <tr key={product.id}>
                  <td className="p-4">
                    <p className="font-semibold text-gray-800">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-400">/{product.slug}</p>
                  </td>

                  <td className="p-4 text-primary">
                    {formateMoney(product.minPrice)}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                      {product.stockStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/products/${product.slug}/edit`}
                        className="text-gray-500 hover:text-primary"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        disabled={remove.isPending}
                        className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Feedback>
      </div>

      <Pager
        page={page}
        totalPages={products.data?.totalPages ?? 0}
        onChange={setPage}
      />
    </div>
  );
}
