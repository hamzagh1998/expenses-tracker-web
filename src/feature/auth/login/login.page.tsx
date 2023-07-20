import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useTheme } from "styled-components";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";

import { auth, googleProvider } from "../../../firebase";

import { AuthContainer, AuthLogoContainer, AuthQuestionText, AuthTypeText, ErrorText, FlexContainer, GoogleButton, LinkText, OrLine } from "../../../styles/global-styles";
import { Spacer } from "../../../components/spacer/spacer";
import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";

import logo from "../../../assets/logo.png";

import { tryToCatch } from "../../../utils/try-to-catch";


export function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const theme: any = useTheme();  

  const onLogin = async () => {
    setIsLoading(true);
    setError("");
    const [error, _] = await tryToCatch(signInWithEmailAndPassword, auth, email, password);
    if (error) {
      const errorCode = error.code;
      const errorType = errorCode.split("/")[1];
      const emailError = "Incorrect email. Please enter it again."
      const passwordError = "Incorrect password. Please enter it again."      
      setError(errorType === "invalid-email" ? emailError : passwordError);
    }
    setIsLoading(false);
  };

  const onGoogleSignIn = async () => {
    const [error, data] = await tryToCatch(signInWithPopup, auth, googleProvider);
    if (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    };
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(data);
    const token = credential!.accessToken;
    // The signed-in user info.
    const user = data.user;
  };

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
          Sign in
        </AuthTypeText>
        <Spacer size="large" />
        <AuthQuestionText>
          New to Expenses Tracker? <LinkText href="/auth/register">Create an account</LinkText> 
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
        <GoogleButton onClick={onGoogleSignIn}>
          <FcGoogle size={26} />
          Sign in with Google
        </GoogleButton>
        <Spacer size="large" />
        <ButtonComponent 
          text="Sign in" 
          iconPosition="right"
          spin={true}
          icon={isLoding ? <ImSpinner2 size={20} /> : null} 
          disabled={error.length > 0}
          onClick={error.length ? () => null : onLogin}
        />
      </GenericBoxComponent>
    </AuthContainer>
  );
};
