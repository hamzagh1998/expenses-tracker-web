import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { object, string } from "yup";
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

  const [inputsInfo, setInputsInfo] = useState({email: "", password: ""});
  const [inputsError, setInputsError] = useState({email: "", password: ""});
  const [showPwd, setShowPwd] = useState(false);

  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const theme: any = useTheme();  

  let loginSchema = object({
    email: string().email("Pls enter a valid email address!").required("Email is required!"),
    password: string().min(6).required("Password is required!"),
  });

  const handleInput = async (attribute: string, value: string) => {
    setInputsInfo(inputsInfo => ({...inputsInfo, ...{[attribute]: value}}));
    const [error, _] = await tryToCatch(loginSchema.validateAt, attribute, {[attribute]: value});
    setInputsError(inputsError => ({...inputsError, ...{[attribute]: ""}}));
    if (error) {
      setInputsError(inputsError => ({...inputsError, ...{[error.path]: error.message}}));
    };
  };

  const onLogin = async () => {
    setIsLoading(true);
    setError("");
    setInputsError({ email: "", password: "" });
    const [validationError, __] = await tryToCatch(loginSchema.validate, inputsInfo, { abortEarly: false });

    // Check if there are validation errors before proceeding
    try {
      await loginSchema.validate(inputsInfo, { abortEarly: false });
      const [error, _] = await tryToCatch(signInWithEmailAndPassword, auth, inputsInfo.email, inputsInfo.password);
      if (error) {
        const errorCode = error.code;
        const errorType = errorCode.split("/")[1];
        const emailError = "Incorrect email. Please enter it again."
        const passwordError = "Incorrect password. Please enter it again."      
        setError(errorType === "invalid-email" ? emailError : passwordError);
      };
    } catch(err: any) {
      const pathToMessage = err.inner.reduce((acc: any, error: any) => {
        acc[error.path] = error.message;
        return acc;
      }, {});

      setInputsError({
        ...inputsError,
        ...pathToMessage,
      });
    } finally {
      setIsLoading(false);
    };
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
        <div>
          <InputComponent
            type="email"
            value={inputsInfo.email}
            placeholder="Email"
            error={inputsError.email.length > 0}
            setValue={(value: string) => handleInput("email", value)}        
          />
          { inputsError.email 
            ? <ErrorText style={{color: "#f00"}}>{inputsError.email}</ErrorText>
            : null
          }
        </div>
        <Spacer size="medium" />
        <div>
          <InputComponent
            type={showPwd ? "text" : "password"}
            value={inputsInfo.password}
            placeholder="Password"
            setValue={(value: string) => handleInput("password", value)}      
            error={inputsError.password.length > 0}  
            icon={
              showPwd 
                ? <BsEye size={20} onClick={() => setShowPwd(false)} /> 
                : <PiEyeClosedLight size={20} onClick={() => setShowPwd(true)}/>
            }      
          />
          { inputsError.password 
            ? <ErrorText style={{color: "#f00"}}>{inputsError.password}</ErrorText>
            : null
          }
        </div>
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
          onClick={onLogin}
        />
      </GenericBoxComponent>
    </AuthContainer>
  );
};
