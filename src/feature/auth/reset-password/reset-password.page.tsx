import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { object, string } from "yup";
import { useTheme } from "styled-components";
import { ImSpinner2 } from "react-icons/im";

import { auth } from "../../../firebase";

import { Spacer } from "../../../components/spacer/spacer";
import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";
import { BackComponent } from "../../../components/back/back.component";

import { AuthContainer, AuthLogoContainer, AuthTypeText, ErrorText, SuccessText } from "../../../styles/global-styles";
import { HintText } from "./styles";

import { tryToCatch } from "../../../utils/try-to-catch";

import logo from "../../../assets/logo.png";


export function ResetPasswordPage() {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isLoding, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const theme: any = useTheme();  

  let emailSchema = object({
    email: string().email("Pls enter a valid email address!").required("Email is required!"),
  });

  const handleInput = async (value: string) => {
    setEmail(value);
    setEmailError("");
    try {
      await emailSchema.validateAt("email", {"email": value})
    } catch (err: any) {
      err.inner.reduce((acc: any, error: any) => {
        setEmailError(error.message);
      }, {});
    }
  };

  const onSendResetEmail = async () => {
    setIsLoading(true);
    setEmailError("");
    try {
      await emailSchema.validate({"email": email}, { abortEarly: false })
      const [error, _] = await tryToCatch(sendPasswordResetEmail, auth, email);
      if (error) {
        const errorCode = error.code;
        const errorType = errorCode.split("/")[1];      
        const emailError = "Incorrect email. Please enter it again!"
        const userNotFoundError = "No user exists with this email!"              
        setError(errorType === "invalid-email" ? emailError : userNotFoundError);
        setEmail("");
      } else {
        setSuccess("An email containing a reset link has been sent to your email address!  If you don't see the email in your inbox, please check your spam or junk folder.");
      };
      
    } catch (err: any) {
      err.inner.reduce((acc: any, error: any) => {
        setEmailError(error.message);
      }, {});
    } finally {
      setIsLoading(false);
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
        height={338} 
        width={410} 
        vCentred={true}
        hCentred={true}
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
        <HintText>
          Forgot your password? No problem! Just enter the email address that you signed up with to reset it.
        </HintText>
        <Spacer size="small" />
        {
          success.length && !error.length
            ? <GenericBoxComponent 
                  height={48} 
                  width={300} 
                  padding={18}
                  borderRadius={12} 
                  bgColor={theme.currentTheme.successBackgroundColor}
              >
                <SuccessText>
                  {success}
                </SuccessText>
              </GenericBoxComponent>
            : <></>
        }
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
        <Spacer size="small" />
        <InputComponent
          type="email"
          value={email}
          placeholder="Email"
          error={emailError.length > 0}
          setValue={handleInput}        
        />
        { emailError.length
            ? <ErrorText style={{color: "#f00"}}>{emailError}</ErrorText>
            : null
        }
        <Spacer size="large" />
        <ButtonComponent 
          text="Send reset link" 
          iconPosition="right"
          spin={true}
          disabled={!email.length}
          icon={isLoding ? <ImSpinner2 size={20} /> : null} 
          onClick={onSendResetEmail}
        />
      </GenericBoxComponent>
    </AuthContainer>
  );
};
