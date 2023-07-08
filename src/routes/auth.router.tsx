import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/login/login.page";
import { RegisterPage } from "../pages/register/register.page";


export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

