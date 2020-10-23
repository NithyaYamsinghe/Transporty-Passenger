// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./../components/passenger/pages/Login";
import Register from "./../components/passenger/pages/Register";
import Home from "./../components/passenger/pages/Home";
import ForgotPassword from "./../components/passenger/account/ForgotPassword";

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetPassword" component={ForgotPassword} />
      </Switch>
    );
  }
}

export default AppRouter;
