// import external libs
import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// layouts
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import MainLayout from "./layouts/main-layout/MainLayout";
import PublicLayout from "./layouts/public-layout/PublicLayout";

// authentication routes
import Login from "pages/auth/login/Login";
import Register from "pages/auth/register/Register";

// public routes
import Home from "pages/client/home/Home";
import HotelList from "pages/client/hotels/hotel-list/HotelList";
import HotelDetail from "pages/client/hotels/hotel-detail/HotelDetail";

import Error404 from "pages/Error404";

export const AppRouter: React.FC = () => {
  const authenLayout = <AuthLayout />;
  const protectedLayout = <MainLayout />;
  const publicLayout = <PublicLayout />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={publicLayout}>
          <Route index element={<Home />} />
          <Route path="/hotel-list" element={<HotelList />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
        </Route>
        <Route path={"/auth"} element={authenLayout}>
          <Route index element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route path="404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
