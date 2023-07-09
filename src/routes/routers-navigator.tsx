import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { auth } from "../firebase";

import { AuthRouter } from "./auth.router";
import { MainRouter } from "./main.router";
import { LoadingScreenComponent } from "../components/component/loading-screen.component";

export function RoutersNavigator() {
  const [userData, setUserData] = useState< User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {    
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUserData(user);
        setIsLoggedIn(true);
        // ...
      } else {
        // User is signed out
        setIsLoggedIn(false);
      };
      setIsLoading(false);
    });
  }, []);

  const currentPath = location.pathname;

  const authRoutes = ["/auth/login", "/auth/register", "/auth/reset-password", "/auth/new-password"];
  const mainRoutes = ["/main/home", "/main/detail"];

  useEffect(() => {
    if (!isLoggedIn && !authRoutes.includes(currentPath)) navigate("/auth/login");
    else if (isLoggedIn && !mainRoutes.includes(currentPath)) navigate("/main/home");
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      { 
        isLoading
          ? <Route path="/*" element={<LoadingScreenComponent />} />
          : isLoggedIn
              ? <Route path="/main/*" element={<MainRouter />} />
              : <Route path="/auth/*" element={<AuthRouter />} />

      }
    </Routes>
  );
};
