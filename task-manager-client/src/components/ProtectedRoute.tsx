import React, { useContext, useEffect, useState } from "react"
import { Redirect, Route, useHistory, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import LoginPage from "./LoginPage";

interface ProtectedRouteProps {
  Component: () => JSX.Element;
  path: string;
} 

const ProtectedRoute = ({Component, path}: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      path={path}
      render={props =>
        (authContext?.user) ?
          <Component /> :
          <LoginPage />
      }
      />
  )
}

export default ProtectedRoute;