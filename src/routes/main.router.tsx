import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../feature/main/home/home.page";
import { DetailPage } from "../feature/main/detail/detail.page";


export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/main" element={<Navigate to="/home" />} />
    </Routes>
  );
};

