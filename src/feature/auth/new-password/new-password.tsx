import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { useTheme } from "styled-components";
import { ImSpinner2 } from "react-icons/im";
import { BsEye } from "react-icons/bs";
import { PiEyeClosedLight } from "react-icons/pi";

import { auth } from "../../../firebase";

import { Spacer } from "../../../components/spacer/spacer";
import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { InputComponent } from "../../../components/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";

import { AuthContainer, AuthLogoContainer, AuthTypeText, ErrorText, LinkText, SuccessText } from "../../../styles/global-styles";
import { HintText } from "./styles";

import logo from "../../../assets/logo.png";

import { tryToCatch } from "../../../utils/try-to-catch";


export function NewPasswordPage() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showPwd, setShowPwd] = useState(false);
  const [showConPwd, setShowConPwd] = useState(false);

  const [isLoding, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const theme: any = useTheme();  

  let oobCode: string | null = searchParams.get("oobCode");
  
  useEffect(() => {
    if (!oobCode) navigate("/auth/login");
  }, [oobCode]);

  const onUpdatePassword = async () => {
    setIsLoading(true);
    const [error, _] = await tryToCatch(confirmPasswordReset, auth, oobCode, newPassword);
    if (error) {
      const errorCode = error.code;
      const errorType = errorCode.split("/")[1]; 
      setError(errorType === "invalid-action-code" ? "Invalid action" : "Something went wrong!");
      setNewPassword("");
      setConfirmNewPassword(""); 
    } else {
      setSuccess("Your new password has been saved!");
    };
    setIsLoading(false)
  };

  return (
    <AuthContainer>
      <AuthLogoContainer>
        <img src={logo} alt="logo" height={46} width={46} />
        Expenses Tracker
      </AuthLogoContainer>
      <Spacer size="medium" />
      <GenericBoxComponent 
        height={348} 
        width={410} 
        vCentred={true}
        hCentred={true}
        padding={18}
        borderRadius={12} 
        bgColor={theme.currentTheme.backgroundColor}
        shadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
      >
        <Spacer size="large" />
        <AuthTypeText>
          New password
        </AuthTypeText>
        <Spacer size="medium" />
        <HintText>
          Please enter your new password and confirm it.
        </HintText>
        <Spacer size="large" />
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
                  {success} &ensp;
                  <LinkText href="/auth/login">Login</LinkText>
                </SuccessText>
              </GenericBoxComponent>
            : <></>
        }
        <Spacer size="small" />
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
        <InputComponent
          type={showPwd ? "text" : "password"}
          value={newPassword}
          placeholder="New Password"
          setValue={setNewPassword}  
          icon={
            showPwd 
              ? <BsEye size={20} onClick={() => setShowPwd(false)} /> 
              : <PiEyeClosedLight size={20} onClick={() => setShowPwd(true)}/>
          }        
        />
        <Spacer size="small" />
        <InputComponent
          type={showConPwd ? "text" : "password"}
          value={confirmNewPassword}
          placeholder="Confirm Password"
          setValue={setConfirmNewPassword}   
          icon={
            showConPwd 
              ? <BsEye size={20} onClick={() => setShowConPwd(false)} /> 
              : <PiEyeClosedLight size={20} onClick={() => setShowConPwd(true)}/>
          }       
        />
        <Spacer size="medium" />
        <ButtonComponent 
          text="Change Password" 
          iconPosition="right"
          spin={true}
          disabled={error.length > 0}
          icon={isLoding ? <ImSpinner2 size={20} /> : null} 
          onClick={error.length ? () => null : onUpdatePassword}
        />
      </GenericBoxComponent>
    </AuthContainer>
  );
};
