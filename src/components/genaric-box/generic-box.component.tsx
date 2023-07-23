import React from "react";
import styled, { CSSProperties } from "styled-components";

interface Props {
  height: number;
  width: number;
  hCentred?: boolean;
  vCentred?: boolean;
  bgColor: string;
  padding?: number | string;
  borderRadius?: number;
  shadow?: string;
  children: React.ReactNode;
}

const Container = styled.div<Props>`
  min-height: ${({ height }) => height}px;
  min-width: ${({ width }) => width}px;
  background-color: ${({ bgColor }) => bgColor};
  padding: ${({ padding }) =>
    typeof padding === "number" ? padding + "px" : padding};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  box-shadow: ${({ shadow }) => shadow};
`;

const Wrapper = styled.div<Pick<Props, "hCentred" | "vCentred" | "height" | "width">>`
  display: flex;
  justify-content: ${({ hCentred }) => (hCentred ? "center" : "left")};
  align-items: ${({ vCentred }) => (vCentred ? "center" : "top")};
  min-width: ${({ width }) => width}px;
  min-height: ${({ height }) => height}px;
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
        <div>
          {children}
        </div>
      </Wrapper>
    </Container>
  );
}
