import React from "react";
import styled from "styled-components";


type Vpositions = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "stretch";
type Hpositions = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
type Directions = "row" | "row-reverse" | "column" | "column-reverse";

interface Props {
  flexDirection?: Directions;
  justifyContent?: Vpositions;
  alignItems?: Hpositions;
  gap?: number;
  backgroundColor?: string;
  padding?: number;
  children: React.ReactNode;
};


const Container = styled.div<Props>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  ${({ gap }) => gap && `gap: ${gap}px;`}
  ${({ backgroundColor }) => backgroundColor && `backgroundColor: ${backgroundColor};`}
  ${({ padding }) => padding && `padding: ${padding}px;`}
`;


export function FlexBoxComponent({ 
  flexDirection="row",
  justifyContent="center", 
  alignItems="center", 
  gap, 
  backgroundColor,
  padding,
  children 
}: Props) {

  return (
    <Container
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      backgroundColor={backgroundColor}
      padding={padding}
    >
      {children}
    </Container>
  );
};
