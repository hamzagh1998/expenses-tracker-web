import React from "react"
import { Routes, Route } from "react-router-dom";

import { AuthRouter } from "./auth.router";
import { HomeRouter } from "./home.router";


export function RoutersNavigator() {

  const isLoggedIn = false;

  return (
    <Routes>
      {
        isLoggedIn
          ? <Route path="/*" element={<HomeRouter />} />
          : <Route path="/*" element={<AuthRouter />} />
      }
    </Routes>    
  );
};
