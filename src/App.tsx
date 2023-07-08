import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { RoutersNavigator } from "./routes/routers-navigator";


export function App() {
  return (
    <Router>
      <RoutersNavigator />
    </Router>
  );
};
