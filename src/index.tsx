import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import "./index.css";
import "./fonts.css";
import reportWebVitals from "./reportWebVitals";
import { lightTheme } from "./styles/themes/light.theme";
import { sizes } from "./styles/sizes";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={{currentTheme: lightTheme, sizes}}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
