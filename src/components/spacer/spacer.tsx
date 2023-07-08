import React from "react";
import styled from "styled-components";

type Position = "top" | "left" | "right" | "bottom";
type Size = "small" | "medium" | "large" | "xl" | "xxl" | number;

interface Props {
  position?: Position;
  size?: Size;
  children?: React.ReactNode;
};

const positionVariant = {
  top: "margin-top",
  left: "margin-left",
  right: "margin-right",
  bottom: "margin-bottom",
};

const SpacerView = styled.div<{ position: Position; size: Size }>`
  ${({ position, size, theme }) => `
    ${positionVariant[position]}: ${
      typeof size === "number" ? size + "px" : theme.sizes.margins[size]
    };
  `};
`;

export function Spacer({ position="top", size="small", children }: Props) {

  return (
    <SpacerView position={position} size={size}>
      {children}
    </SpacerView>
  );
};
