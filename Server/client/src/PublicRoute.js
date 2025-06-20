import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import Loading from "./Component/Loading";

const PublicRoute = ({ children }) => {
  const { User } = useContext(AppContext);

  if (User.loading) return <Loading />;

  return User.isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
