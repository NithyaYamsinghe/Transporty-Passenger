// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./../components/passenger/pages/Login";
import Register from "./../components/passenger/pages/Register";
import Home from "./../components/passenger/pages/Home";
import ForgotPassword from "./../components/passenger/account/ForgotPassword";
import SelectionRegisterType from "./../components/passenger/register/SelectionRegisterType";
import ForeignerRegisterationForm from "./../components/passenger/register/ForeignerRegistrationForm";

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/registerForeigner"
          component={ForeignerRegisterationForm}
        />
        <Route exact path="/resetPassword" component={ForgotPassword} />
        <Route exact path="/selectType" component={SelectionRegisterType} />
      </Switch>
    );
  }
}

export default AppRouter;
