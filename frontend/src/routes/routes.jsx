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

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "/products",
                element: <ProductsPage />,
            },
            {
                path: "/product-details",
                element: <ProductDetailsPage />,
            },
            {
                path: "/wishlist",
                element: <WishlistPage />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/checkout",
                element: <CheckoutPage />,
            },
            {
                path: "/order-details",
                element: <OrderDetails />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
            {
                path: "/account",
                element: <AccountLayout />,
                children: [
                    {
                        path: "",
                        element: <AccountsInfo />,
                    },
                    {
                        path: "/account/password",
                        element: <PasswordChange />,
                    },
                    {
                        path: "/account/address",
                        element: <MyAddress />,
                    },
                    {
                        path: "/account/orders",
                        element: <MyOrders />,
                    },
                ]
            },

        ]
    }
])

export default router;