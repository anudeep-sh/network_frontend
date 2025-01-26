import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({allowedRoles}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const navigate = useNavigate();

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const validateToken = (token) => {
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt && decodedJwt.exp * 1000 > Date.now()) {
        return true;
      }
    }
    return false;
  };

  const validateAccess = () => {
    const token = localStorage.getItem("Token");
    const userRole = localStorage.getItem("Role");
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt && allowedRoles.includes(userRole)&&validateToken(token)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (validateAccess()) {
      setIsLoggedIn(true);
      setIsAuthorized(true);
      
    } else {
      setIsLoggedIn(false);
      setIsAuthorized(false);
      navigate("/");
    }
  }, []);

  if (!isLoggedIn) {
    return null; // Or a loading spinner
  }
  if (!isAuthorized) {
    return <h1>Unauthorized Access</h1>; // Display an unauthorized message or redirect
  }


  return  <Outlet />;
};

export default ProtectedRoute;
