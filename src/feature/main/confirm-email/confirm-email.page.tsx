import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { applyActionCode, checkActionCode, signOut } from "firebase/auth";
import { IoMdLogOut } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";

import { auth } from "../../../firebase";

import { ButtonComponent } from "../../../components/button/button.component";
import { FlexBoxComponent } from "../../../components/flex-box/flex-box.component";
import { GenericBoxComponent } from "../../../components/genaric-box/generic-box.component";
import { LoadingScreenComponent } from "../../../components/indicators/loading-screen.component";

import { Text, Title } from "./styles";

import { tryToCatch } from "../../../utils/try-to-catch";

import confirmMailImg from "../../../assets/confirm-email.gif";
import { Spacer } from "../../../components/spacer/spacer";
import { ErrorText } from "../../../styles/global-styles";

import { screenSizeInInches } from "../../../utils/screen-size-in-inch";


export function ConfirmEmailPage() {

  const navigate = useNavigate();

  const theme: any = useTheme();  

  const currentScreenWidth = window.innerWidth;

  const [currentDimension, setCurrentDimension] = useState<null | {width: string, height: string}>(null);
  const [error, setError] = useState(null);


  const params = JSON.parse(localStorage.getItem("params")!);  

  const handleEmailAction = async (mode:string, oobCode: string) => {
    try {
      if (mode === "verifyEmail") {
        // Check if the action code is valid
        await checkActionCode(auth, oobCode!);

        // Apply the action (in this case, verify the email)
        await applyActionCode(auth, oobCode!);  
      };
    } catch (error) {
      console.error("Error verifying email:", error);
    };
  };  

  if (params) {
    (async () => {
      await handleEmailAction(params.mode, params.oobCode)
      localStorage.removeItem("params");
      navigate("/main/home");     
    })();
  };

  const dimensions = {
    from8to10: {width: "70vw", height: "60vh"},
    from11to12: {width: "50vw", height: "70vh"},
    from13to14: {width: "40vw", height: "60vh"},
    from15anmore: {width: "30vw", height: "50vh"},
  };

  useEffect(() => {
    const screenSize = screenSizeInInches(currentScreenWidth);
    if (screenSize >= 8 && screenSize <= 10) {
      setCurrentDimension(dimensions.from8to10);
    } else if (screenSize >= 11 && screenSize <= 12) {
      setCurrentDimension(dimensions.from11to12);
    } else if (screenSize >= 13 && screenSize <= 14) {
      setCurrentDimension(dimensions.from13to14);
    } else if (screenSize >= 15) {
      setCurrentDimension(dimensions.from15anmore);
    };
  }, [currentScreenWidth]);  

  const onSignOut = async () => {
    const [error, _] = await tryToCatch(signOut, auth);
    if (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    };
  };

  return (
    <GenericBoxComponent
      height="100vh"
      width="100vw"
      bgColor={theme.currentTheme.backgroundColor}
    >
      {
        currentDimension
          ? (
              <GenericBoxComponent
                height={currentDimension.height}
                width={currentDimension.width}
                bgColor={theme.currentTheme.successBackgroundColor}
                borderRadius={12}
                shadow={`0px 2px 4px 0px ${theme.currentTheme.shadow}`}
                padding={48}
              >
                <img src={confirmMailImg} alt="confirm email logo" />
                <Title>Please Confirm Your Email Address</Title>
                <Text>
                  Thank you for signing up! We've just sent you a confirmation link to your email address.
                  Please check your inbox. In case you can't find it, remember to check your spam folder as well.
                </Text>
                <FlexBoxComponent gap={12}>
                  <ButtonComponent 
                    text="Refresh" 
                    width={150}
                    gap={10}
                    padding="12px 6px"
                    bgColor={theme.currentTheme.successColor}
                    hBgColor={theme.currentTheme.successColorHover}
                    icon={<TfiReload size={20} />}
                    onClick={() => window.location.reload()}
                  />
                  <ButtonComponent 
                    text="Sign out" 
                    width={150}
                    gap={10}
                    padding="12px 6px"
                    bgColor={theme.currentTheme.errorText}
                    hBgColor={theme.currentTheme.errorTextHover}
                    icon={<IoMdLogOut size={24} />}
                    onClick={onSignOut}
                  />
                </FlexBoxComponent>
                <Spacer size="large" />
                {
                  error
                    ? <GenericBoxComponent 
                          height={18} 
                          width="30vw"
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
              </GenericBoxComponent>
            )
          : <LoadingScreenComponent />
      }
      
    </GenericBoxComponent>
  );
};
