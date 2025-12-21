import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PriviteRoute = () => {
  const isLogged = localStorage.getItem("token");

  return isLogged ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PriviteRoute;