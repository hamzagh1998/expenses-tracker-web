import styled from "styled-components";


export const PolicyText = styled.div`
  font-family: Regular;
  color: ${({theme}) => theme.currentTheme.textColor};
  font-size: 12px;
  font-weight: normal;
  max-width: 350px;
`;

export const InputsWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin: 0;
  padding: 0;
`;