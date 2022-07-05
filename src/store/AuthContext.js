import React from "react";

const AuthContext = React.createContext({
  token: "",
  user: {},
  logOut: () => {},
  userChangeHandler: () => {},
  tokenChangeHandler: () => {},
});

export default AuthContext;
