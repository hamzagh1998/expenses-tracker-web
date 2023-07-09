import React, { useState } from "react";
import { useTheme } from "styled-components";

import { AuthContainer, AuthLogoContainer, AuthQuestionText, AuthTypeText, FlexContainer, GoogleButton, InputsWrapper, LinkText, OrLine, PolicyText } from "../../../styles/global-styles";
import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { Spacer } from "../../../components/spacer/spacer";
import { InputComponent } from "../../../components/input/input.component";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { ButtonComponent } from "../../../components/button/button.component";
import { ImSpinner2 } from "react-icons/im";

import logo from "../../../assets/logo.png";


export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        height={542} 
        width={410} 
        vCentred={false}
        padding={18}
        borderRadius={12} 
        bgColor={theme.currentTheme.backgroundColor}
        shadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
      >
        <Spacer size="large" />
        <AuthTypeText>
          Register
        </AuthTypeText>
        <Spacer size="large" />
        <AuthQuestionText>
          Already have an account? <LinkText href="/auth/login">Login</LinkText> 
        </AuthQuestionText>
        <Spacer size="large" />
        <InputsWrapper>
          <InputComponent
            type="text"
            width={150}
            value={firstName}
            placeholder="First name"
            setValue={setFirstName}        
          />
          <InputComponent
            type="text"
            width={150}
            value={lastName}
            placeholder="Last name"
            setValue={setLastName}        
          />
        </InputsWrapper>
        <Spacer size="medium" />
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
          text="Register" 
          iconPosition="right"
          spin={true}
          icon={isLoding ? <ImSpinner2 size={20} onClick={() => setShowPwd(true)}/> : null} 
          disabled={error.length > 0}
          onClick={error.length ? () => null : () => null}
        />
        <Spacer />
        <PolicyText>
          By continuing, you agree to Expenses Tracker <LinkText>Terms of Service</LinkText> and <LinkText>Privacy Policy</LinkText>.
        </PolicyText>
      </GenericBoxComponent>
    </AuthContainer>
  );
};
