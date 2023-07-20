import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

type InputType = "text" | "email" | "password";

interface Props {
  height?: number;
  width?: number;
  borderRadius?: number;
  type?: InputType;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  setValue: Function;
  icon?: React.ReactNode;
  borderColor?: string;
  borderColorActive?: string;
  error?: boolean;
}

const InputWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
`;

const Input = styled.input<Pick<Props, "height" | "width" | "borderRadius" | "borderColor" | "error">>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  font-size: ${({ theme }) => theme.sizes.fonts.large};
  background-color: #f3f6f8;
  border: ${({borderColor, error, theme}) => "2px solid " + (error ? theme.currentTheme.errorText : borderColor)};
  padding: 0 10px;
  transition: border-color 0.3s ease;
  position: relative;
  z-index: 1;

  &:focus {
    border-color: ${({ theme }) => theme.currentTheme.primaryColor};
    outline: none;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
  z-index: 2;
  cursor: pointer;
`;

export function InputComponent({
  height=46,
  width=330,
  borderRadius=6,
  type="text",
  value,
  placeholder="",
  setValue,
  icon=null,
  borderColor="rgba(217, 224, 230)",
  error=false
}: Props) {
  return (
    <InputWrapper>
      <Input
        height={height}
        width={width}
        borderRadius={borderRadius}
        type={type}
        value={value}
        placeholder={placeholder}
        borderColor={borderColor}
        error={error}
        onChange={(e) => setValue(e.target.value)}
      />
      {icon ? <IconWrapper>{icon}</IconWrapper> : null}
    </InputWrapper>
  );
}
