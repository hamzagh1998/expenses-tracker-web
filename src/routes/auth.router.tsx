import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../feature/auth/login/login.page";
import { RegisterPage } from "../feature/auth/register/register.page";


export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth" element={<Navigate to="/login" />} />
    </Routes>
  );
};

