import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";
import { object, string } from "yup";
import { useTheme } from "styled-components";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";
import jwt_decode from "jwt-decode";

import { setUserData } from "../slices/auth.slice";

import { auth, googleProvider } from "../../../firebase";
import { LoginI, RegisterI, useLoginMutation } from "../../../redux/services/auth.service";

import { Spacer } from "../../../components/spacer/spacer";
import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";

import { AuthContainer, AuthLogoContainer, ContentContainer, AuthQuestionText, AuthTypeText, ErrorText, FlexContainer, GoogleButton, LinkText, OrLine, AuthTypeTextConatiner } from "../../../styles/global-styles";

import logo from "../../../assets/logo.png";

import { tryToCatch } from "../../../utils/try-to-catch";


export function LoginPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const theme: any = useTheme();  

  // Create the useLoginMutation hook  
  const [loginMutation] = useLoginMutation();

  const [inputsInfo, setInputsInfo] = useState({email: "", password: ""});
  const [inputsError, setInputsError] = useState({email: "", password: ""});
  const [showPwd, setShowPwd] = useState(false);

  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const params = JSON.parse(localStorage.getItem("params")!);  

  const mode: string | null = params ? params.mode : null;
  const oobCode: string | null = params ? params.oobCode : null;
  
  useEffect(() => {
    if (oobCode && mode) {
      if (mode === "resetPassword") navigate("/auth/new-password");
    };
  }, [oobCode, mode]);

  const loginSchema = object({
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
      const [error, userCredential] = await tryToCatch(signInWithEmailAndPassword, auth, inputsInfo.email, inputsInfo.password);
      if (error) {
        const errorCode = error.code;
        const errorType = errorCode.split("/")[1];
        const emailError = "No account found for this email. Please check your email or sign up."
        const passwordError = "Password is incorrect. Please re-enter your password."      
        console.log(errorType);
        setError(errorType === "user-not-found" ? emailError : passwordError);
      } else {
        const userFbToken = userCredential?.user?.accessToken; // firbase access token
        const { email, password } = inputsInfo; // Extract required fields
        const payload: LoginI = { email, password, userFbToken, provider: "email" }; // Create the payload for registration
        const [error, res] = await tryToCatch(loginMutation, payload); // Pass the payload to the mutation      
        if (error) {
          if (userCredential?.user) await deleteUser(auth.currentUser!);
        } else {
          const decoded = jwt_decode(res.data.detail) || null;
          dispatch(setUserData({ token: res.token, fbToken: userFbToken, userData: decoded }));
        };
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
    const [error, userCredential] = await tryToCatch(signInWithPopup, auth, googleProvider);
    if (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setError("Ooops, Something went wrong!");
    } else {
      // The signed-in user info.
      const user = userCredential.user;
      const userFbToken = user?.accessToken; // firbase access token
      const { email, displayName, photoURL } = user;
      const [firstName, lastName] = displayName.split(" ");
      const payload: RegisterI = { firstName, lastName, email, photoURL, userFbToken, provider: "google" }; // Create the payload for registration
      const [error, res] = await tryToCatch(loginMutation, payload); // Pass the payload to the mutation      
      if (error) {
        if (user) await deleteUser(auth.currentUser!);
      } else {
        const decoded = jwt_decode(res.data.detail) || null;   
        dispatch(setUserData({ token: res.detail, fbToken: userFbToken, userData: decoded }));
      };
    };
  }; 

  return (
    <AuthContainer>
      <AuthLogoContainer>
        <img src={logo} alt="logo" height={46} width={46} />
        Expenses Tracker
      </AuthLogoContainer>
      <Spacer size="medium" />
      <GenericBoxComponent 
        width={365}
        vCentred={false}
        padding={18}
        borderRadius={12} 
        bgColor={theme.currentTheme.backgroundColor}
        shadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
      >
        <ContentContainer>
          <Spacer size="large" />
          <AuthTypeTextConatiner>
            <AuthTypeText>
              Sign in
            </AuthTypeText>
            <Spacer size="large" />
            <AuthQuestionText>
              New to Expenses Tracker? <LinkText href="/auth/register">Create an account</LinkText> 
            </AuthQuestionText>
          </AuthTypeTextConatiner>
          <Spacer />
          {
            error.length
              ? <GenericBoxComponent 
                    height={48} 
                    width={320} 
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
            value={inputsInfo.email}
            placeholder="Email"
            error={inputsError.email.length > 0}
            setValue={(value: string) => handleInput("email", value)}        
          />
          { inputsError.email 
            ? <ErrorText>{inputsError.email}</ErrorText>
            : null
          }
          <Spacer size="medium" />
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
            ? <ErrorText>{inputsError.password}</ErrorText>
            : null
          }
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
        </ContentContainer>
      </GenericBoxComponent>
    </AuthContainer>
  );
};
