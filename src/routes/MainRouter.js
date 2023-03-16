import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Forgotpassword from "../components/login-component/ForgotPassword";
import Login from "../components/login-component/LoginPage";
import Otp from "../components/login-component/OtpPage";
import UpdatePassword from "../components/login-component/UpdatePassword";
import OrdersList from "../components/order-component/OrdersList";
import ProfileImageUpload from "../components/profile/Profile";
import SuperAdminDrawer from "../components/SideBar";
import Dashboard from "../components/super-admin/Dashboard";
import UpdateNewPassword from "../components/update-new-password/UpdateNewPassword";
import UserList from "../components/user-component/UserList";
import RouteErrorPage from "./RouteErrorPage";

const MainRouter = () => {
  const location = useLocation();
  const loginStatus = JSON.parse(localStorage.getItem("userLoggedLocal"));
  const userRole = localStorage.getItem("userLoggedRole");

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/forgot_password" ||
      location.pathname === "/otp" ||
      location.pathname === "/update_password"
    ) {
      localStorage.setItem("userLoggedLocal", false);
    }
  }, [location.pathname, loginStatus]);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/forgot_password" element={<Forgotpassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/update_password" element={<UpdatePassword />} />

        <Route
          path="/superadmin/dashboard"
          element={
            loginStatus === true ? (
              <SuperAdminDrawer element={<Dashboard />} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/superadmin/users"
          element={
            loginStatus === true ? (
              <SuperAdminDrawer element={<UserList />} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/superadmin/orders"
          element={
            loginStatus === true ? (
              <SuperAdminDrawer element={<OrdersList />} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/superadmin/profile"
          element={
            loginStatus === true ? (
              <SuperAdminDrawer element={<ProfileImageUpload />} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/superadmin/update_new_password"
          element={
            loginStatus === true ? (
              <SuperAdminDrawer element={<UpdateNewPassword />} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route path="/*" element={<RouteErrorPage />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
