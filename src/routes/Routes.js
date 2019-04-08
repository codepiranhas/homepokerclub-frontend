import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "../containers/Home/Home";
import Account from "../containers/Account/Account";
import NotFound from "../containers/NotFound/NotFound";
import Login from "../containers/Login/Login";
import Signup from "../containers/Signup/Signup";
import ForgotPassword from "../containers/ForgotPassword/ForgotPassword";
import ResetPassword from "../containers/ResetPassword/ResetPassword";

import SocialRedirect from "../containers/SocialRedirect/SocialRedirect";

import AuthenticatedRoute from "../hocs/AuthenticatedRoute";
import UnauthenticatedRoute from "../hocs/UnauthenticatedRoute";

import Menubar from '../components/Menubar/Menubar';

const Router = ({ childProps, location }) => {
  let withMenuBar = false;

  // Routes that include the bottom menu bar
  if (location.pathname === '/' ||
      location.pathname === '/clubs' ||
      location.pathname === '/tournaments' ||
      location.pathname === '/account'
  ) {
    withMenuBar = true;
  }

  return (
    <>
    { withMenuBar && 

      <Menubar />
        // <Menu>
        //   <a id="home" className="menu-item" href="/">Home</a>
        //   <a id="about" className="menu-item" href="/about">About</a>
        //   <a id="contact" className="menu-item" href="/account">Account</a>
        //   <a onClick={ childProps.showSettings } className="menu-item--small" href="">Settings</a>
        // </Menu>
      }
      <Switch>
        <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
        <AuthenticatedRoute path="/account" exact component={Account} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
        <UnauthenticatedRoute path="/forgotpassword" exact component={ForgotPassword} props={childProps} />
        <UnauthenticatedRoute path="/resetpassword/:token" exact component={ResetPassword} props={childProps} />
        <UnauthenticatedRoute path="/socialredirect" exact component={SocialRedirect} props={childProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
      </Switch>

      {/* Only show the menubar to specific routes */}
    </>
    )
}

export default withRouter(Router);
