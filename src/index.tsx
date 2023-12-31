import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import "./index.css";
import "./fonts.css"
import reportWebVitals from "./reportWebVitals";

import { store } from "./redux/store";

import { lightTheme } from "./styles/themes/light.theme";
import { darkTheme } from "./styles/themes/dark.theme";
import { sizes } from "./styles/sizes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={{currentTheme: lightTheme, sizes}}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
