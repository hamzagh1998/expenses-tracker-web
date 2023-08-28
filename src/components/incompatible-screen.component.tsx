import React from "react";
import { useTheme } from "styled-components";

import { GenericBoxComponent } from "./genaric-box/generic-box.component";

export function IncompatibleScreenComponent() {

  const theme: any = useTheme();  

  return (
    <GenericBoxComponent
      height="100vh"
      width="100vw"
      bgColor={theme.currentTheme.backgroundColor}
    >
      <GenericBoxComponent
        height="30vh"
        width="70vw"
        bgColor={theme.currentTheme.successBackgroundColor}
        borderRadius={12}
        shadow={`0px 2px 4px 0px ${theme.currentTheme.shadow}`}
        padding={48}
      >
        <p style={{textAlign: "center", fontSize: 14}}>This screen is not compatible with this app, pls use bigger screen!</p>
      </GenericBoxComponent>
    </GenericBoxComponent>
  );
};
