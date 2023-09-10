import React, { MouseEventHandler } from "react";
import styled, { useTheme, css, keyframes } from "styled-components";

type Position = "left" | "right";

interface Props {
  text: string;
  height?: number;
  width?: number;
  gap?: number;
  padding?: string | number;
  borderRadius?: number;
  borderColor?: string;
  color?: string;
  bgColor?: string;
  hBgColor?: string;
  icon?: React.ReactNode;
  iconPosition?: Position;
  spin?: boolean;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CustomButton = styled.div<Pick<Props, "height" | "width" | "padding" | "borderRadius" | "gap" | "borderColor" | "color" | "bgColor" | "hBgColor" | "disabled">>`
  display: flex;
  justify-content: center;
  gap: ${({gap}) => gap}px;
  font-size: ${({ theme }) => theme.sizes.fonts.large};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  padding: ${({ padding }) => typeof padding === "number" ? padding + "px" : padding};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border-color: ${({ borderColor }) => borderColor};
  color: ${({ color, disabled, theme }) => (disabled ? theme.currentTheme.disabledText : color)};
  background-color: ${({ bgColor }) => bgColor};
  opacity: ${({disabled}) => disabled ? .2 : 1};
  cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};

  &:hover {
    background-color: ${({ hBgColor, disabled }) => !disabled && hBgColor};
  }
`;

const IconWrapper = styled.div<Pick<Props, "iconPosition"> & { spin?: boolean }>`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 0;
  margin: 0;
  ${({ spin }) =>
    spin &&
    css`
      animation: ${spinAnimation} .5s linear infinite;
    `}
`;


export function ButtonComponent({
  text,
  height=26,
  width=330,
  padding=12,
  borderRadius=6,
  gap=48,
  borderColor,
  color="#fff",
  bgColor,
  hBgColor,
  icon,
  iconPosition="right",
  spin=false,
  disabled=false,
  onClick
}: Props) {
  const theme: any = useTheme();

  bgColor = bgColor ? bgColor : theme.currentTheme.primaryColor;
  borderColor = borderColor ? borderColor : bgColor;
  hBgColor = hBgColor ? hBgColor : theme.currentTheme.primaryColorHover;

  return (
    <CustomButton
      onClick={onClick}
      height={height}
      width={width}
      padding={padding}
      borderRadius={borderRadius}
      borderColor={borderColor}
      color={color}
      gap={gap}
      bgColor={bgColor}
      hBgColor={hBgColor}
      disabled={disabled}
    >
      {
        icon && iconPosition === "left" && (
          <IconWrapper iconPosition={iconPosition} spin={spin}>
            {icon}
          </IconWrapper>
      )}
      {icon && iconPosition === "right" && <div></div>}
      {text}
      {icon && iconPosition === "left" && <div></div>}
      {
        icon && iconPosition === "right" && (
          <IconWrapper iconPosition={iconPosition} spin={spin}>
            {icon}
          </IconWrapper>
      )}
    </CustomButton>
  );
}
