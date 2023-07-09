import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { AuthRouter } from "./auth.router";
import { MainRouter } from "./main.router";

export function RoutersNavigator() {
  const isLoggedIn = false;
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const authRoutes = ["/auth/login", "/auth/register", "/auth/reset-password"];

  useEffect(() => {
    if (!isLoggedIn && !authRoutes.includes(currentPath)) navigate("/auth/login");
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      {
        isLoggedIn
          ? <Route path="/main/*" element={<MainRouter />} />
          : <Route path="/auth/*" element={<AuthRouter />} />
      }
    </Routes>
  );
};
