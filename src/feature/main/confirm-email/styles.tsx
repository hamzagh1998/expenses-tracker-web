import styled  from "styled-components";

export const Title = styled.p`
  font-size: ${({theme}) => theme.sizes.fonts.xxl};
  color: ${({theme}) => theme.currentTheme.successColor};
  text-align: center;
  letter-spacing: .7px;
`;

export const Text = styled.p`
  font-size: ${({theme}) => theme.sizes.fonts.large};
  color: ${({theme}) => theme.currentTheme.textColor};
  text-align: center;
  line-height: 32px;
  letter-spacing: .7px;
`;