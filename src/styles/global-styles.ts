import styled from "styled-components";

import AuthBackground from "../assets/auth-bg.svg";

// #################################### auth routes (login, register) ####################################

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFE8E4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='2'%3E%3Cpath transform='translate(0 0)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='4' transform='rotate(0 800 450)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(0 0)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='4'%3E%3Cpath transform='translate(0 0)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='8' transform='rotate(0 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='rotate(0 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const AuthLogoContainer = styled.div`
  position: absolute;
  font-family: MochiyRegular;
  top: 2%;
  left: 5%;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 20%;
  font-size: ${({theme}) => theme.sizes.fonts.xl};
  color: ${({theme}) => theme.currentTheme.textColor};
  font-weight: bold;
`;


export const AuthTypeText = styled.p`
  font-family: MochiyRegular;
  color: ${({theme}) => theme.currentTheme.textColor};
  font-size: ${({theme}) => theme.sizes.fonts.xxl};
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
`;

export const AuthQuestionText = styled.p`
  font-family: Regular;
  color: ${({theme}) => theme.currentTheme.textColor};
  font-size: ${({theme}) => theme.sizes.fonts.small};
  margin: 0;
`

export const LinkText = styled.a`
  font-family: Regular;
  color: ${({theme}) => theme.currentTheme.primaryColor};
  font-size: ${({theme}) => theme.sizes.fonts.small};
  text-decoration: underline;
  margin: 0;
  cursor: pointer;

  &:hover {
    color: ${({theme}) => theme.currentTheme.primaryColorHover};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  font-family: Regular;
  justify-content: space-between;
  color: ${({theme}) => theme.currentTheme.textColor};
  gap: 2.5px;
  align-items: center;
  font-size: 12px;
  width: 100%;
  height: fit-content;
`;

export const OrLine = styled.div`
  width: 100%;
  height: .1px;
  background-color: ${({theme}) => theme.currentTheme.textColor};
  opacity: .3;
`

export const GoogleButton = styled.div`
  display: flex;
  font-family: Regular;
  color: ${({theme}) => theme.currentTheme.textColor};
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
  height: 46px;
  border-radius: 6px;
  border: 1px solid rgba(217, 224, 230);
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: ${({theme}) => theme.currentTheme.primaryColorHover};
  }
`;

export const PolicyText = styled.div`
  font-family: Regular;
  font-size: 12px;
  font-weight: normal;
  max-width: 350px;
`;

export const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin: 0;
  padding: 0;
`;
