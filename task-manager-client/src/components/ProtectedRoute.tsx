import React, { useContext, useEffect, useState } from "react"
import { Redirect, Route, useHistory, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  Component: () => JSX.Element;
  path: string;
} 

const ProtectedRoute = ({Component, path}: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log("CHANGE: ", authContext)
  }, [authContext])

  return (
    <Route
      path={path}
      render={props =>
        (authContext?.user) ?
          <Component /> :
          <Redirect to={{ pathname:"/login" }}/>
      }
      />
  )
}

export default ProtectedRoute;