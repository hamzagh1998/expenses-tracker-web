import React from "react";
import styled, { keyframes, useTheme } from "styled-components";


interface Props {
  bgColor?: string;
  color?: string;
};

const LoadingContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${({bgColor}) => bgColor};
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div<Props>`
  margin: auto;
  border: 20px solid #EAF0F6;
  border-radius: 50%;
  border-top: 20px solid ${({color}) => color};
  width: 200px;
  height: 200px;
  animation: ${spinAnimation} .7s linear infinite;
`;

export function LoadingScreenComponent({ bgColor, color }: Props) {

  const theme: any = useTheme();

  bgColor = bgColor ? bgColor : theme.currentTheme.backgroundColor;
  color = color ? color : theme.currentTheme.primaryColor;

  return (
    <LoadingContainer bgColor={bgColor}>
      <Loader color={color} />
    </LoadingContainer>
  );
};
