import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../feature/auth/login/login.page";
import { RegisterPage } from "../feature/auth/register/register.page";
import { ResetPasswordPage } from "../feature/auth/reset-password/reset-password.page";
import { NewPasswordPage } from "../feature/auth/new-password/new-password.page";


export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/new-password" element={<NewPasswordPage />} />
      <Route path="/auth" element={<Navigate to="/login" />} />
    </Routes>
  );
};

