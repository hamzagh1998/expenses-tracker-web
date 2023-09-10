import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { object, string } from "yup";
import jwt_decode from "jwt-decode";

import { setUserData } from "../slices/auth.slice";

import { auth, googleProvider } from "../../../firebase";
import { RegisterI, useRegisterMutation } from "../../../redux/services/auth.service";

import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { Spacer } from "../../../components/spacer/spacer";
import { InputComponent } from "../../../components/input/input.component";
import { FlexBoxComponent } from "../../../components/flex-box/flex-box.component";
import { ButtonComponent } from "../../../components/button/button.component";

import { AuthContainer, AuthLogoContainer, AuthQuestionText, AuthTypeText, AuthTypeTextConatiner, ContentContainer, ErrorText, FlexContainer, GoogleButton, LinkText, OrLine } from "../../../styles/global-styles";
import { PolicyText } from "./styles";

import { tryToCatch } from "../../../utils/try-to-catch";

import logo from "../../../assets/logo.png";


export function RegisterPage() {
  
  const dispatch = useDispatch();

  const theme: any = useTheme();  

  // Create the useRegisterMutation hook  
  const [ registerMutation] = useRegisterMutation();

  const [inputsInfo, setInputsInfo] = useState({firstName: "", lastName: "", email: "", password: ""});
  const [inputsError, setInputsError] = useState({firstName: "", lastName: "", email: "", password: ""});
  const [showPwd, setShowPwd] = useState(false);

  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  let registerSchema = object({
    firstName: string().required("First name is required!"),
    lastName: string().required("Last name is required!"),
    email: string().email("Pls enter a valid email address!").required("Email is required!"),
    password: string().min(6).required("Password is required!"),
  });

  const handleInput = async (attribute: string, value: string) => {
    setInputsInfo(inputsInfo => ({...inputsInfo, ...{[attribute]: value}}));
    setInputsError(inputsError => ({...inputsError, ...{[attribute]: ""}}));
    const [error, _] = await tryToCatch(registerSchema.validateAt, attribute, {[attribute]: value});
    if (error) {
      setInputsError(inputsError => ({...inputsError, ...{[error.path]: error.message}}));
    };
  };

  const onRegister = async () => {    
    setIsLoading(true);
    setError("");
    setInputsError({ firstName: "", lastName: "", email: "", password: "" });
    try {
      await registerSchema.validate(inputsInfo, { abortEarly: false });
      const { email, password } = inputsInfo;
      const [error, userCredential] = await tryToCatch(
        createUserWithEmailAndPassword,
        auth,
        email,
        password
      );
      if (error) {
        const errorCode = error.code;
        const errorType = errorCode.split("/")[1];
        errorType === "invalid-email"
          ? setInputsError({...inputsError, email: "Pls enter a valid email address!"})
          : setError(
            errorType === "email-already-in-use"
              ? "Email address already exists"
              : "Something went wrong please check your network then try again!"
          );
      } else {
        const userFbToken = userCredential?.user?.accessToken; // firbase access token
        const { email, password, firstName, lastName } = inputsInfo; // Extract required fields
        const payload: RegisterI = { firstName, lastName, email, password, userFbToken, provider: "email" }; // Create the payload for registration
        const [error, res] = await tryToCatch(registerMutation, payload); // Pass the payload to the mutation      
        if (error) {
          if (userCredential?.user) await deleteUser(auth.currentUser!);
        } else {
          await sendEmailVerification(userCredential.user);
          const decoded = jwt_decode(res.data.detail) || null;
          dispatch(setUserData({ token: res.token, fbToken: userFbToken, userData: decoded }));
        };
      }
    } catch (err: any) {
      if (err.inner) {
        const pathToMessage = err.inner.reduce((acc: any, error: any) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setInputsError({
          ...inputsError,
          ...pathToMessage,
        });
      };
    } finally {
      setIsLoading(false);
    };
  };


  const onGoogleSignup = async () => {
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
      const [error, res] = await tryToCatch(registerMutation, payload); // Pass the payload to the mutation      
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
              Sign up
            </AuthTypeText>
            <Spacer size="large" />
            <AuthQuestionText>
              Already have an account? <LinkText href="/auth/login">Sign in</LinkText> 
            </AuthQuestionText>
          </AuthTypeTextConatiner>
          <Spacer />
          {
            error.length
              ? <GenericBoxComponent 
                    height={48} 
                    width={320} 
                    vCentred={true}
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
          <FlexBoxComponent justifyContent="space-between">
            <FlexBoxComponent flexDirection="column" alignItems="flex-start">
              <InputComponent
                type="text"
                width={150}
                value={inputsInfo.firstName}
                placeholder="First name"
                error={inputsError.firstName.length > 0}
                setValue={(value: string) => handleInput("firstName", value)}    
              />
              { inputsError.firstName 
                ? <ErrorText>{inputsError.firstName}</ErrorText>
                : null
              }
            </FlexBoxComponent>
            <FlexBoxComponent flexDirection="column" alignItems="flex-start">
              <InputComponent
                type="text"
                width={150}
                value={inputsInfo.lastName}
                placeholder="Last name"
                error={inputsError.lastName.length > 0}
                setValue={(value: string) => handleInput("lastName", value)}        
              />
              { inputsError.lastName 
                  ? <ErrorText>{inputsError.lastName}</ErrorText>
                  : null
              }
            </FlexBoxComponent>
          </FlexBoxComponent>
          <Spacer size="medium" />
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
            error={inputsError.password.length > 0}
            setValue={(value: string) => handleInput("password", value)}  
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
          <Spacer size="large" />
          <FlexContainer>
            <OrLine />
              Or
            <OrLine />
          </FlexContainer>
          <Spacer size="large" />
          <GoogleButton onClick={onGoogleSignup}>
            <FcGoogle size={26} />
            Sign up with Google
          </GoogleButton>
          <Spacer size="large" />
          <ButtonComponent 
            text="Sign up" 
            iconPosition="right"
            spin={true}
            icon={isLoding ? <ImSpinner2 size={20} /> : null} 
            onClick={onRegister}
          />
          <Spacer />
          <PolicyText>
            By continuing, you agree to Expenses Tracker <LinkText>Terms of Service</LinkText> and <LinkText>Privacy Policy</LinkText>.
          </PolicyText>
        </ContentContainer>
      </GenericBoxComponent>
    </AuthContainer>
  );
};
