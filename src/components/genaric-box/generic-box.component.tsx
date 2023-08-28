import React from "react";
import styled, { CSSProperties } from "styled-components";

interface Props {
  height: number | string;
  width: number | string;
  hCentred?: boolean;
  vCentred?: boolean;
  bgColor: string;
  padding?: number | string;
  borderRadius?: number;
  shadow?: string;
  children: React.ReactNode;
}

const Container = styled.div<Props>`
  width: ${({ width }) => typeof width === "string" ? width : width + "px"};
  height: ${({ height }) => typeof height === "string" ? height : height + "px"};
  background-color: ${({ bgColor }) => bgColor};
  padding: ${({ padding }) =>
    typeof padding === "number" ? padding + "px" : padding};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  box-shadow: ${({ shadow }) => shadow};
`;

const Wrapper = styled.div<Pick<Props, "hCentred" | "vCentred" | "height" | "width">>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ hCentred }) => (hCentred ? "center" : "left")};
  align-items: ${({ vCentred }) => (vCentred ? "center" : "top")};
  width: ${({ width }) => typeof width === "string" ? width : width + "px"};
  height: ${({ height }) => typeof height === "string" ? height : height + "px"};
  margin: 0;
  padding: 0;
`;

export function GenericBoxComponent({
  height,
  width,
  hCentred=true,
  vCentred=true,
  bgColor,
  padding=0,
  borderRadius=0,
  shadow="none",
  children,
}: Props) {
  
  return (
    <Container
      height={height}
      width={width}
      bgColor={bgColor}
      padding={padding}
      borderRadius={borderRadius}
      shadow={shadow}
    >
      <Wrapper 
        hCentred={hCentred} 
        vCentred={vCentred}
        height={height}
        width={width}
      >
        {children}
      </Wrapper>
    </Container>
  );
}
