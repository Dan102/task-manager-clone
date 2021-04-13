import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Board from "./components/Board";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = (
  <>
    <BrowserRouter>
      <Switch>
        <Route path='/Login' component={LoginPage} />
        <ProtectedRoute path='/Board/:id' Component={Board} />
        <ProtectedRoute path='/' Component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </>
)

export default routes;