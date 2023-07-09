import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useTheme } from "styled-components";
import { object, string } from "yup";

import { auth } from "../../../firebase";

import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { Spacer } from "../../../components/spacer/spacer";
import { InputComponent } from "../../../components/input/input.component";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { ButtonComponent } from "../../../components/button/button.component";
import { ImSpinner2 } from "react-icons/im";

import { AuthContainer, AuthLogoContainer, AuthQuestionText, AuthTypeText, ErrorText, FlexContainer, GoogleButton, LinkText, OrLine } from "../../../styles/global-styles";
import { InputsWrapper, PolicyText } from "./styles";

import logo from "../../../assets/logo.png";

import { tryToCatch } from "../../../utils/try-to-catch";


export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [inputsError, setInputsError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });

  const theme: any = useTheme();  

  let registerSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    password: string().min(6).required(),
  });

  // const validate = () => {
  //   registerSchema.isValid()
  // };

  const onRegister = async () => {
    setIsLoading(true);
    setError("");
    const [error, userCredential] = await tryToCatch(createUserWithEmailAndPassword, auth, email, password);
    if (error) {
      const errorCode = error.code;
      const errorType = errorCode.split("/")[1];
      console.log(errorType);
      
      setError(errorType === "email-already-in-use" ? "Email address already exists" : "Something went wrong please check your network then try again!");
    } else {
      await sendEmailVerification(userCredential.user);
    };
    setIsLoading(false);
  };

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
          Sign up
        </AuthTypeText>
        <Spacer size="large" />
        <AuthQuestionText>
          Already have an account? <LinkText href="/auth/login">Sign in</LinkText> 
        </AuthQuestionText>
        <Spacer size="large" />
        {
          error.length
            ? <GenericBoxComponent 
                  height={48} 
                  width={300} 
                  vCentred={false}
                  padding={18}
                  borderRadius={12} 
                  bgColor={theme.currentTheme.errorBackgroundColor}
              >
                <ErrorText>
                  {error}
                </ErrorText>
              </GenericBoxComponent>
            : <></>
        }
        <Spacer size="medium" />
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
          Sign up with Google
        </GoogleButton>
        <Spacer size="large" />
        <ButtonComponent 
          text="Sign up" 
          iconPosition="right"
          spin={true}
          icon={isLoding ? <ImSpinner2 size={20} /> : null} 
          disabled={error.length > 0}
          onClick={error.length || isLoding ? () => null : onRegister}
        />
        <Spacer />
        <PolicyText>
          By continuing, you agree to Expenses Tracker <LinkText>Terms of Service</LinkText> and <LinkText>Privacy Policy</LinkText>.
        </PolicyText>
      </GenericBoxComponent>
    </AuthContainer>
  );
};
