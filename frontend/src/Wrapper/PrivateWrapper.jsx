import React, { useContext } from "react";
import { BookSto } from "../Context";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateWrapper() {
  const { token } = useContext(BookSto);
  if (token) {
    return <Outlet />;
  }
  return <Navigate to={"/login"} />;
}
