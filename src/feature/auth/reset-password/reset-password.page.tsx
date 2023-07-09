import React, { useState } from "react";
import { useTheme } from "styled-components";

import { AuthContainer, AuthLogoContainer, AuthQuestionText, AuthTypeText, LinkText, PolicyText } from "../../../styles/global-styles";
import { Spacer } from "../../../components/spacer/spacer";

import logo from "../../../assets/logo.png";
import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";
import { BackComponent } from "../../../components/back/back.component";


export function ResetPasswordPage() {

  const [email, setEmail] = useState("");

  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const theme: any = useTheme();  

  return (
    <AuthContainer>
      <AuthLogoContainer>
        <img src={logo} alt="logo" height={46} width={46} />
        Expenses Tracker
      </AuthLogoContainer>
      <Spacer size="medium" />
      <GenericBoxComponent 
        height={338} 
        width={410} 
        vCentred={false}
        padding={18}
        borderRadius={12} 
        bgColor={theme.currentTheme.backgroundColor}
        shadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
      >
        <BackComponent />
        <Spacer size="large" />
        <AuthTypeText>
          password Reset
        </AuthTypeText>
        <Spacer size="large" />
        <PolicyText>
          Forgot your password? No problem! Just enter the email address that you signed up with to reset it.
        </PolicyText>
        <Spacer size="large" />
        <InputComponent
          type="email"
          value={email}
          placeholder="Email"
          setValue={setEmail}        
        />
        <Spacer size="large" />
        <ButtonComponent 
          text="Send reset instructions" 
          iconPosition="right"
          spin={true}
          disabled={error.length > 0}
          onClick={error.length ? () => null : () => null}
        />
      </GenericBoxComponent>
    </AuthContainer>
  );
};
