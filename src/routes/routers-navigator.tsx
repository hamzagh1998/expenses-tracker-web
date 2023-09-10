import React, { useEffect, useState } from "react";
import { User, applyActionCode, checkActionCode, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { auth } from "../firebase";

import { AuthRouter } from "./auth.router";
import { MainRouter } from "./main.router";
import { LoadingScreenComponent } from "../components/indicators/loading-screen.component";

export function RoutersNavigator() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState< User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

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

  const url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);
  
  const mode = urlParams.get("mode");
  const oobCode = urlParams.get("oobCode");  

  if (mode && oobCode) localStorage.setItem("params", JSON.stringify({mode, oobCode}));

  const authRoutes = ["/auth/login", "/auth/register", "/auth/reset-password", "/auth/new-password"];
  const mainRoutes = ["/main/confirm-email", "/main/home", "/main/detail"];
  
  useEffect(() => {
    if (!isLoggedIn && !authRoutes.includes(currentPath)) navigate("/auth/login");
    else if (isLoggedIn) {
      if (!auth.currentUser?.emailVerified) {
        navigate("/main/confirm-email");
      } else if (!mainRoutes.includes(currentPath)) {
        navigate("/main/home");
      };
    };
  }, [isLoggedIn, mode, navigate]);

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
