import React, { useState } from "react";
import {  signOut } from "firebase/auth";

import { auth } from "../../../firebase";

import { tryToCatch } from "../../../utils/try-to-catch";


export function HomePage() {

  const [error, setError] = useState(null);

  const onSignOut = async () => {
    const [error, _] = await tryToCatch(signOut, auth);
    if (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ":" + errorMessage);
      setError(errorMessage);
    };
  };

  return (
    <div>home.page
      <button onClick={onSignOut}>Logout</button>
    </div>
  );
};
