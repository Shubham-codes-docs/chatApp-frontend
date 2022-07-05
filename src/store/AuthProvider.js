import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";

let timer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjExpirationTime - currentTime;
  return remainingTime;
};

const retrieveToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const storedTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedTime);
  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: storedToken,
    user: storedUser,
    validTime: remainingTime,
  };
};

const AuthProvider = (props) => {
  const tokenData = retrieveToken();
  let initialToken;
  let initialUser = JSON.stringify({});

  if (tokenData) {
    initialToken = tokenData.token;
    initialUser = localStorage.getItem("user") || JSON.stringify({});
  }

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(JSON.parse(initialUser));

  const logOutHandler = useCallback(() => {
    setToken(null);
    setUser({});
    if (timer) {
      clearTimeout(timer);
    }
  },[]);

  const onTokenChange = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    timer = setTimeout(logOutHandler, remainingTime);
  };

  const onUserChange = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (tokenData) {
      timer = setTimeout(logOutHandler, tokenData.validTime);
    }
  }, [tokenData,logOutHandler]);

  const authContext = {
    token,
    user,
    tokenChangeHandler: onTokenChange,
    userChangeHandler: onUserChange,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
