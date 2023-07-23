import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { object, string } from "yup";
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

  const [password, setPassword] = useState({password: "", confirmPassword: ""});
  const [passwordError, setPasswordError] = useState({password: "", confirmPassword: ""});

  const [showPwd, setShowPwd] = useState(false);
  const [showConPwd, setShowConPwd] = useState(false);

  const [isLoding, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const theme: any = useTheme();  

  let passwordSchema = object({
    password: string().min(6).required("Password is required!"),
    confirmPassword: string().required("Pls Confirm your password!"),
  });

  const handleInput = async (attribute: string, value: string) => {
    setPassword(password => ({...password, ...{[attribute]: value}}));
    setPasswordError(passwordError => ({...passwordError, ...{[attribute]: ""}}));
    const [error, _] = await tryToCatch(passwordSchema.validateAt, attribute, {[attribute]: value});
    if (error) {
      setPasswordError(passwordError => ({...passwordError, ...{[error.path]: error.message}}));
    };
  };

  let oobCode: string | null = searchParams.get("oobCode");
  
  useEffect(() => {
    if (!oobCode) navigate("/auth/login");
  }, [oobCode]);

  const onUpdatePassword = async () => {
    setIsLoading(true);
    setPasswordError({password: "", confirmPassword: ""});
    try {
      await passwordSchema.validate(password, {abortEarly: false});
      if (!(password.password === password.confirmPassword)) 
        return setPasswordError({...passwordError, confirmPassword: "The two passwords didn't match!"});
      const [error, _] = await tryToCatch(confirmPasswordReset, auth, oobCode, password);
      if (error) {
        const errorCode = error.code;
        const errorType = errorCode.split("/")[1]; 
        setError(errorType === "invalid-action-code" ? "Invalid action" : "Something went wrong!");
        setPassword({password: "", confirmPassword: ""});
      } else {
        setSuccess("Your new password has been saved!");
      };
    } catch (err: any) {
      const pathToMessage = err.inner.reduce((acc: any, error: any) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
  
      setPasswordError({
        ...passwordError,
        ...pathToMessage,
      });
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
          type={showPwd ? "text" : "password"}
          value={password.password}
          placeholder="New Password"
          error={passwordError.password.length > 0}
          setValue={(value: string) => handleInput("password", value)}  
          icon={
            showPwd 
              ? <BsEye size={20} onClick={() => setShowPwd(false)} /> 
              : <PiEyeClosedLight size={20} onClick={() => setShowPwd(true)}/>
          }        
        />
        { passwordError.password.length
            ? <ErrorText style={{color: "#f00"}}>{passwordError.password}</ErrorText>
            : null
        }
        <Spacer size="small" />
        <InputComponent
          type={showConPwd ? "text" : "password"}
          value={password.confirmPassword}
          placeholder="Confirm Password"
          error={passwordError.confirmPassword.length > 0}
          setValue={(value: string) => handleInput("confirmPassword", value)}  
          icon={
            showConPwd 
              ? <BsEye size={20} onClick={() => setShowConPwd(false)} /> 
              : <PiEyeClosedLight size={20} onClick={() => setShowConPwd(true)}/>
          }       
        />
        { passwordError.confirmPassword.length
            ? <ErrorText style={{color: "#f00"}}>{passwordError.confirmPassword}</ErrorText>
            : null
        }
        <Spacer size="medium" />
        <ButtonComponent 
          text="Change Password" 
          iconPosition="right"
          spin={true}
          disabled={!password.password.length}
          icon={isLoding ? <ImSpinner2 size={20} /> : null} 
          onClick={onUpdatePassword}
        />
      </GenericBoxComponent>
    </AuthContainer>
  );
};
