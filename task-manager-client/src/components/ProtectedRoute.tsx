import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { Route } from "react-router";
import ILoggedUser from "../models/interfaces/ILoggedUser";
import { IApplicationState } from "../store/store";
import LoginPage from "./LoginPage";

interface ProtectedRouteProps {
  Component: () => JSX.Element;
  path: string;
}

const ProtectedRoute = ({Component, path}: ProtectedRouteProps) => {
  const loggedUser = useSelector<IApplicationState, ILoggedUser | undefined>(x => x.auth.loggedUser);

  useEffect(() => {
    console.log("protected route changing loggedUser to: ", loggedUser)
  }, [loggedUser])

  return (
    <Route
      path={path}
      render={_props =>
        loggedUser ?
          <Component /> :
          <LoginPage />
      }
      />
  )
}

export default ProtectedRoute;