import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "../pages/Protected";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/private" component={ProtectedRoute}/>
      </Switch>
    </BrowserRouter>
  );
};
