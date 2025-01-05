import React from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem("userLoggedIn");

  if (!!isUserLoggedIn) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export default Auth;
