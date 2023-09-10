import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { RoutersNavigator } from "./routes/routers-navigator";

import { lightTheme } from "./styles/themes/light.theme";
import { darkTheme } from "./styles/themes/dark.theme";
import { sizes } from "./styles/sizes";

import { LoadingScreenComponent } from "./components/indicators/loading-screen.component";
import { IncompatibleScreenComponent } from "./components/incompatible-screen.component";

import { screenSizeInInches } from "./utils/screen-size-in-inch";


export function App() {

  const [currentScreenSize, setCurrentScreenSize] = useState<null | number>(null);

  const currentScreenWidth = window.innerWidth;

  useEffect(() => {
    setCurrentScreenSize(screenSizeInInches(currentScreenWidth));
  }, [currentScreenWidth]);  

  return (
    <ThemeProvider theme={{currentTheme: lightTheme, sizes}}>
      <Router>
        {
          currentScreenSize
            ? currentScreenSize >= 8
              ?  <RoutersNavigator />
              : <IncompatibleScreenComponent />
            : <LoadingScreenComponent />
        }
      </Router>
    </ThemeProvider>
  );
};
