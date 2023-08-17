import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useTheme } from "styled-components";
import { object, string } from "yup";

import { auth, googleProvider } from "../../../firebase";
import { useRegisterMutation } from "../../../redux/services/auth.service";

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

import { tryToCatch } from "../../../utils/try-to-catch";

import logo from "../../../assets/logo.png";



export function RegisterPage() {

  const [inputsInfo, setInputsInfo] = useState({firstName: "", lastName: "", email: "", password: ""});
  const [inputsError, setInputsError] = useState({firstName: "", lastName: "", email: "", password: ""});
  const [showPwd, setShowPwd] = useState(false);

  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const theme: any = useTheme();  

  // Create the useRegisterMutation hook  
  const [registerMutation, { isLoading }] = useRegisterMutation();
  
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
      const { email, password, firstName, lastName } = inputsInfo; // Extract required fields
      const payload = { email, password, firstName, lastName }; // Create the payload for registration
      const res = await registerMutation(payload); // Pass the payload to the mutation
      await sendEmailVerification(userCredential.user);
    }
  } catch (err: any) {    
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


  const onGoogleSignup = async () => {
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
          <div>
            <InputComponent
              type="text"
              width={150}
              value={inputsInfo.firstName}
              placeholder="First name"
              error={inputsError.firstName.length > 0}
              setValue={(value: string) => handleInput("firstName", value)}    
            />
            { inputsError.firstName 
              ? <ErrorText style={{color: "#f00"}}>{inputsError.firstName}</ErrorText>
              : null
            }
          </div>
          <div>
            <InputComponent
              type="text"
              width={150}
              value={inputsInfo.lastName}
              placeholder="Last name"
              error={inputsError.lastName.length > 0}
              setValue={(value: string) => handleInput("lastName", value)}        
            />
            { inputsError.lastName 
                ? <ErrorText style={{color: "#f00"}}>{inputsError.lastName}</ErrorText>
                : null
            }
          </div>
        </InputsWrapper>
        <Spacer size="medium" />
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
            ? <ErrorText style={{color: "#f00"}}>{inputsError.password}</ErrorText>
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
      </GenericBoxComponent>
    </AuthContainer>
  );
};
