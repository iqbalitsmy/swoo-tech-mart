import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../Pages/HomePage/HomePage";
import ProductDetailsPage from "../Pages/ProductDetails/ProductDetailsPage";
import ProductsPage from "../Pages/Products/ProductsPage";
import SignupPage from "@/Pages/SignupPage/SignupPage";
import LoginPage from "@/Pages/LoginPage/LoginPage";
import WishlistPage from "@/Pages/WishlistPage/WishlistPage";
import CartPage from "@/Pages/CartPage/CartPage";
import AccountLayout from "@/Layout/AccountLayout";
import AccountsInfo from "@/Pages/Accounts/AccountsInfo";
import PasswordChange from "@/Pages/Accounts/PasswordChange";
import MyAddress from "@/Pages/Accounts/MyAddress";
import MyOrders from "@/Pages/Accounts/MyOrders";
import CheckoutPage from "@/Pages/CheckoutPage/CheckoutPage";
import OrderDetails from "@/Pages/OrderDetails/OrderDetails";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import PaymentResultPage from "@/Components/CheckoutPage/PaymentResultPage";
import PaymentPage from "@/Pages/PaymentPage/PaymentPage";

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
                path: "checkout/payment-result",
                element: <PaymentResultPage />
            },
            {
                path: "checkout/pay/:orderId",
                element: <PaymentPage />
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
        ],
    },
])

export default router;