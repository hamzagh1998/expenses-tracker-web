import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import "./index.css";
import "./fonts.css"
import reportWebVitals from "./reportWebVitals";

import { lightTheme } from "./styles/themes/light.theme";
import { darkTheme } from "./styles/themes/dark.theme";
import { sizes } from "./styles/sizes";
import { GlobalStyles } from "./global-styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={{currentTheme: lightTheme, sizes}}>
      <>
        <Helmet>
          <link rel="stylesheet" href="./fonts.css" />
          {/* Add more <link> tags if needed */}
        </Helmet>
        <GlobalStyles />
        <App />
      </>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
