import {
  Building2,
  FolderTree,
  LayoutDashboard,
  Package,
  ShoppingBag,
  SlidersHorizontal,
  Tags,
  Users,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  {
    label: "Overview",
    to: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Products",
    to: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    to: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: Users,
  },
  {
    label: "Categories",
    to: "/admin/catalog/categories",
    icon: FolderTree,
  },
  {
    label: "Brands",
    to: "/admin/catalog/brands",
    icon: Building2,
  },
  {
    label: "Tags",
    to: "/admin/catalog/tags",
    icon: Tags,
  },
  {
    label: "Variants",
    to: "/admin/catalog/variants",
    icon: SlidersHorizontal,
  },
];

export default function AdminLayout() {
  const { user } = useAuth();
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-lg border border-primary/20 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Swoo Tech Mart
          </p>
          <h1 className="mt-1 text-lg font-bold text-gray-800">Admin panel</h1>
          <p className="mt-1 truncate text-xs text-gray-400">{user?.email}</p>
          <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col">
            {
              navigation.map(({ label, to, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))
            }
          </nav>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
