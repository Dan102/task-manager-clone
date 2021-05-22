import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Board from "./components/Board";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = (
  <>
    <BrowserRouter>
      <Switch>
        <Route path='/Login' component={LoginPage} />
        <Route path='/Error' component={ErrorPage} />
        <ProtectedRoute path='/Board/:id' Component={Board} />
        <ProtectedRoute path='/' Component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </>
)

export default routes;