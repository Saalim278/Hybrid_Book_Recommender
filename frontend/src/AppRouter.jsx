import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WebWrapper from "./Wrapper/WebWrapper";
import Homepage from "./pages/Homepage";
import BuyNow from "./pages/BuyNow";
import About from "./pages/About";
import Search from "./pages/Search";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PrivateWrapper from "./Wrapper/PrivateWrapper";
import MyOrders from "./pages/MyOrders";
import Address from "./pages/Address";
import NewAddress from "./pages/NewAddress";
import UpdateAddress from "./pages/UpdateAddress";

export default function AppRouter() {
  const routers = createBrowserRouter([
    {
      element: <WebWrapper />,
      children: [
        {
          element: <PrivateWrapper />,
          children: [
            {
              path: "/buynow",
              element: <BuyNow />,
            },
            {
              path: "/my-orders",
              element: <MyOrders />,
            },
            {
              path: "/my-address",
              element: <Address />,
            },
            {
              path: "/new-address",
              element: <NewAddress />,
            },
            {
              path: "/update-address",
              element: <UpdateAddress />,
            },
          ],
        },
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
}
