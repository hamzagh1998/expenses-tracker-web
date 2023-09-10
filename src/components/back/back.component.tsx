import React from "react";
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

type Sizes = "xsmall" | "small" | "medium" | "large" | "xl" | "xxl";

interface Props {
  text?: string;
  link?: string;
  color?: string;
  hColor?: string;
  size?: Sizes;
  backIcon?: React.ReactNode;
};

const BackBtn = styled.div<Pick<Props, "color" | "hColor" | "size">>`
  display: flex;
  font-family: Regular;
  font-size: ${({size}) => size};
  font-weight: bold;
  color: ${({color}) => color};
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: fit-content;
  cursor: pointer;

  &:hover {
    color: ${({hColor}) => hColor};
  }
`;

export function BackComponent({text="Back", link, color, hColor, size="medium", backIcon }: Props) {

  const navigate = useNavigate();
  const theme: any = useTheme();

  const onBack = () => {
    localStorage.removeItem("params");
    link
      ? navigate(link) // navigate to another route
      : navigate(-1); // Back to the previous page
    };

  color = !color ? theme.currentTheme.primaryColor : color;
  hColor = !hColor ? theme.currentTheme.primaryColorHover : color;
  size = theme.sizes.fonts[size];  
  backIcon = !backIcon ? <IoIosArrowBack size={size} color={color} /> : backIcon;

  return (
    <BackBtn onClick={onBack} color={color} hColor={hColor} size={size}>
      {backIcon}
      {text}
    </BackBtn>
  );
};
