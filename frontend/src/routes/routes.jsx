import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import HomePage from "../pages/HomePage/HomePage";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import ProductsPage from "../pages/Products/ProductsPage";
import SignupPage from "@/pages/SignupPage/SignupPage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import WishlistPage from "@/pages/WishlistPage/WishlistPage";
import CartPage from "@/pages/CartPage/CartPage";
import AccountLayout from "@/layouts/AccountLayout";
import AccountsInfo from "@/pages/Accounts/AccountsInfo";
import PasswordChange from "@/pages/Accounts/PasswordChange";
import MyAddress from "@/pages/Accounts/MyAddress";
import MyOrders from "@/pages/Accounts/MyOrders";
import CheckoutPage from "@/pages/CheckoutPage/CheckoutPage";
import OrderDetails from "@/pages/OrderDetails/OrderDetails";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import PaymentResultPage from "@/components/CheckoutPage/PaymentResultPage";
import PaymentPage from "@/pages/PaymentPage/PaymentPage";
import AdminRoute from "./AdminRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminProducts from "@/pages/Admin/AdminProducts";
import AdminOrders from "@/pages/Admin/AdminOrders";
import AdminUsers from "@/pages/Admin/AdminUsers";
import AdminCatalog from "@/pages/Admin/AdminCatalog";
import ProductEditor from "@/pages/Admin/ProductEditor";
import AdminCategories from "@/pages/Admin/AdminCategories";
import AdminBrands from "@/pages/Admin/AdminBrands";
import AdminTags from "@/pages/Admin/AdminTags";
import AdminVariantAttributes from "@/pages/Admin/AdminVariantAttributes";
import AdminVariantValues from "@/pages/Admin/AdminVariantValues";

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
                path: "checkout",
                element: <CheckoutPage />,
            },
            {
                path: "checkout/pay/:orderId",
                element: <PaymentPage />
            },
            {
                path: "checkout/payment-result",
                element: <PaymentResultPage />
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
                children: [{
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
                        { path: "catalog/variants", element: <AdminVariantAttributes/> },
                        { path: "catalog/variants/:typeId/values", element: <AdminVariantValues /> },
                    ],
                }],
            },
        ],
    },
])

export default router;
