import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../pages/home/home.page";


export const HomeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<Navigate to="/" />} />
    </Routes>
  );
};

