import { createBrowserRouter, Outlet } from "react-router-dom";
import Main from "../layouts/Main";
import SignupPage from "@/Pages/SignupPage/SignupPage";
import LoginPage from "@/Pages/LoginPage/LoginPage";
import WishlistPage from "@/Pages/WishlistPage/WishlistPage";
import CartPage from "@/Pages/CartPage/CartPage";
import AccountLayout from "@/layouts/AccountLayout";
import AccountsInfo from "@/Pages/Accounts/AccountsInfo";
import PasswordChange from "@/Pages/Accounts/PasswordChange";
import MyAddress from "@/Pages/Accounts/MyAddress";
import MyOrders from "@/Pages/Accounts/MyOrders";
import CheckoutPage from "@/Pages/CheckoutPage/CheckoutPage";
import OrderDetails from "@/Pages/OrderDetails/OrderDetails";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import PaymentResultPage from "@/components/CheckoutPage/PaymentResultPage";
import PaymentPage from "@/Pages/PaymentPage/PaymentPage";
import AdminRoute from "./AdminRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/Pages/Admin/AdminDashboard";
import AdminProducts from "@/Pages/Admin/AdminProducts";
import AdminOrders from "@/Pages/Admin/AdminOrders";
import AdminUsers from "@/Pages/Admin/AdminUsers";
import ProductEditor from "@/Pages/Admin/ProductEditor";
import AdminCategories from "@/Pages/Admin/AdminCategories";
import AdminBrands from "@/Pages/Admin/AdminBrands";
import AdminTags from "@/Pages/Admin/AdminTags";
import AdminVariantAttributes from "@/Pages/Admin/AdminVariantAttributes";
import AdminVariantValues from "@/Pages/Admin/AdminVariantValues";
import HomePage from "@/Pages/HomePage/HomePage";
import ProductDetailsPage from "@/Pages/ProductDetails/ProductDetailsPage";
import ProductsPage from "@/Pages/Products/ProductsPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "product-details/:slug",
        element: <ProductDetailsPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        element: <GuestRoute />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          // checkout
          {
            path: "checkout",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <CheckoutPage />,
              },
              {
                path: "pay/:orderId",
                element: <PaymentPage />,
              },
              {
                path: "payment-result",
                element: <PaymentResultPage />,
              },
            ],
          },
          // account layout
          {
            path: "account",
            element: <AccountLayout />,
            children: [
              {
                index: true,
                element: <AccountsInfo />,
              },
              {
                path: "password",
                element: <PasswordChange />,
              },
              {
                path: "address",
                element: <MyAddress />,
              },
              {
                path: "orders",
                element: <MyOrders />,
              },
              {
                path: "order-details/:id",
                element: <OrderDetails />,
              },
            ],
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: "products", element: <AdminProducts /> },
              { path: "products/new", element: <ProductEditor /> },
              { path: "products/:slug/edit", element: <ProductEditor /> },
              { path: "orders", element: <AdminOrders /> },
              { path: "users", element: <AdminUsers /> },
              { path: "catalog/categories", element: <AdminCategories /> },
              { path: "catalog/brands", element: <AdminBrands /> },
              { path: "catalog/tags", element: <AdminTags /> },
              { path: "catalog/variants", element: <AdminVariantAttributes /> },
              {
                path: "catalog/variants/:typeId/values",
                element: <AdminVariantValues />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
