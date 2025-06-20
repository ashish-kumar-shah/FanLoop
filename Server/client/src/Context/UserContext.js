import React, { useReducer, useEffect } from "react";
import { AppContext } from "./AppContext";
import { authReducer } from "../Reducer/AuthReducer";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../Utils/FieldValidators";

import {
  checkUsername,
  loginUser,
  registerUser,
  authenticatedUser,logout
} from "../API/UserApi";
const UserContext = ({ children }) => {
 const initialUser = {
  loading: true,              // Auth check in progress
  isAuthenticated: null,      // Don't assume false yet
  user: null,
  error: null,
};


  const [User, authDispatch] = useReducer(authReducer, initialUser);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authenticatedUser();

        authDispatch({ type: "AUTH_SUCCESS", payload: res.user });
       
        
      } catch (error) {
        authDispatch({ type: "AUTH_FAILED", payload: error.response });
      }
    };
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider
      value={{
        User,
        authDispatch,
        validateEmail,
        validateName,
        validatePassword,
        validateUsername,
        checkUsername,
        loginUser,
        registerUser,
  authenticatedUser,logout,
       
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserContext;
