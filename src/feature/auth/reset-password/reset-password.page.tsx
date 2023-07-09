import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
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

import logo from "../../../assets/logo.png";

import { tryToCatch } from "../../../utils/try-to-catch";


export function ResetPasswordPage() {

  const [email, setEmail] = useState("");

  const [isLoding, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const theme: any = useTheme();  

  const onSendResetEmail = async () => {
    setIsLoading(true);
    const [error, _] = await tryToCatch(sendPasswordResetEmail, auth, email);
    if (error) {
      const errorCode = error.code;
      const errorType = errorCode.split("/")[1];      
      const emailError = "Incorrect email. Please enter it again."
      const passwordError = "Incorrect password. Please enter it again."      
      setError(errorType === "invalid-email" ? emailError : passwordError);
      setEmail("");
    } else {
      setSuccess("An email containing a reset link has been sent to your email address!  If you don't see the email in your inbox, please check your spam or junk folder.");
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
                  vCentred={false}
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
        <Spacer size="small" />
        <InputComponent
          type="email"
          value={email}
          placeholder="Email"
          setValue={setEmail}        
        />
        <Spacer size="large" />
        <ButtonComponent 
          text="Send reset link" 
          iconPosition="right"
          spin={true}
          disabled={error.length > 0}
          icon={isLoding ? <ImSpinner2 size={20} /> : null} 
          onClick={error.length ? () => null : onSendResetEmail}
        />
      </GenericBoxComponent>
    </AuthContainer>
  );
};
