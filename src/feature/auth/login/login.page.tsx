import React, { useState } from "react";
import { useTheme } from "styled-components";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";

import { AuthContainer, AuthLogoContainer, AuthQuestionText, AuthTypeText, FlexContainer, GoogleButton, LinkText, OrLine } from "../../../styles/global-styles";
import { Spacer } from "../../../components/spacer/spacer";
import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";

import logo from "../../../assets/logo.png";


export function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

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
        height={518} 
        width={410} 
        vCentred={false}
        padding={18}
        borderRadius={12} 
        bgColor={theme.currentTheme.backgroundColor}
        shadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
      >
        <Spacer size="large" />
        <AuthTypeText>
          Log in
        </AuthTypeText>
        <Spacer size="large" />
        <AuthQuestionText>
          New to Expenses Tracker? <LinkText href="/auth/register">Create an account</LinkText> 
        </AuthQuestionText>
        <Spacer size="large" />
        <InputComponent
          type="email"
          value={email}
          placeholder="Email"
          setValue={setEmail}        
        />
        <Spacer size="medium" />
        <InputComponent
          type={showPwd ? "text" : "password"}
          value={password}
          placeholder="Password"
          setValue={setPassword}  
          icon={
            showPwd 
              ? <BsEye size={20} onClick={() => setShowPwd(false)} /> 
              : <PiEyeClosedLight size={20} onClick={() => setShowPwd(true)}/>
          }      
        />
        <Spacer size="small" />
        <FlexContainer>
          <div></div>
          <LinkText href="/auth/reset-password">Forgot your password?</LinkText>
        </FlexContainer>
        <Spacer size="large" />
        <FlexContainer>
          <OrLine />
          Or
          <OrLine />
        </FlexContainer>
        <Spacer size="large" />
        <GoogleButton>
          <FcGoogle size={26} />
          Sign in with Google
        </GoogleButton>
        <Spacer size="large" />
        <ButtonComponent 
          text="Log in" 
          iconPosition="right"
          spin={true}
          icon={isLoding ? <ImSpinner2 size={20} onClick={() => setShowPwd(true)}/> : null} 
          disabled={error.length > 0}
          onClick={error.length ? () => null : () => null}
        />
      </GenericBoxComponent>
    </AuthContainer>
  );
};
