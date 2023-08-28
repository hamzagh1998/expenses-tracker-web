import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../feature/main/home/home.page";
import { DetailPage } from "../feature/main/detail/detail.page";
import { ConfirmEmailPage } from "../feature/main/confirm-email/confirm-email.page";


export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/confirm-email" element={<ConfirmEmailPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/main" element={<Navigate to="/home" />} />
    </Routes>
  );
};

