import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Navigate = useNavigate()

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const validateToken = () => {
    const token = localStorage.getItem("Token");
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt && decodedJwt.exp * 1000 > Date.now()) {
        return true;
      }
    }
    return false;
  };


  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && validateToken()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      Navigate("/");
    }
    setIsLoading(false);
  }, [localStorage.getItem("Token")]);

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  return isLoggedIn && <Outlet />;
};

export default ProtectedRoute;
