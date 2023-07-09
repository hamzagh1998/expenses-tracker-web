import styled from "styled-components";


export const HintText = styled.div`
  font-family: Regular;
  color: ${({theme}) => theme.currentTheme.textColor};
  font-size: 12px;
  font-weight: normal;
  max-width: 350px;
`;