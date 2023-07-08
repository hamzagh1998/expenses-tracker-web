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
  setValue: Dispatch<SetStateAction<string>>;
  icon?: React.ReactNode;
  borderColor?: string;
  borderColorActive?: string;
}

const InputWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
`;

const Input = styled.input<Pick<Props, "height" | "width" | "borderRadius">>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  font-size: ${({ theme }) => theme.sizes.fonts.large};
  background-color: #f3f6f8;
  border: 2px solid rgba(217, 224, 230);
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
  icon = null,
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
        onChange={(e) => setValue(e.target.value)}
      />
      {icon ? <IconWrapper>{icon}</IconWrapper> : null}
    </InputWrapper>
  );
}
