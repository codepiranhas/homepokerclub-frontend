import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "../containers/Home/Home";
import Main from "../containers/Main/Main";
import Account from "../containers/Account/Account";

import Members from "../containers/Members/Members";
import MembersCreate from "../containers/Members/MembersCreate";
import MembersEdit from "../containers/Members/MembersEdit";
import MembersDelete from "../containers/Members/MembersDelete";

import NotFound from "../containers/NotFound/NotFound";
import Login from "../containers/Login/Login";
import Signup from "../containers/Signup/Signup";
import ForgotPassword from "../containers/ForgotPassword/ForgotPassword";
import ResetPassword from "../containers/ResetPassword/ResetPassword";
import SocialRedirect from "../containers/SocialRedirect/SocialRedirect";
import Sidebar from "../components/Sidebar/Sidebar";
import Buttons from "../components/Showcase/Buttons";

import AuthenticatedRoute from "../hocs/AuthenticatedRoute";
import UnauthenticatedRoute from "../hocs/UnauthenticatedRoute";

const routesWithoutSidebar = [
  'login',
  'signup',
  'forgotpassword',
  'resetpassword',
  'socialredirect',
]

const Router = ({ childProps, location }) => {
  const hideSidebar = routesWithoutSidebar.some(route => {
    return location.pathname.includes(route);
  });

  const allRoutes = 
    <Switch>
      <AuthenticatedRoute path="/" exact component={Main} props={childProps} />

      <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
      <UnauthenticatedRoute path="/forgotpassword" exact component={ForgotPassword} props={childProps} />
      <UnauthenticatedRoute path="/resetpassword/:token" exact component={ResetPassword} props={childProps} />
      <UnauthenticatedRoute path="/socialredirect" exact component={SocialRedirect} props={childProps} />

      <AuthenticatedRoute path="/clubs/:clubId" exact component={Home} props={childProps} />
      <AuthenticatedRoute path="/clubs/:clubId/account" exact component={Account} props={childProps} />

      <AuthenticatedRoute path="/clubs/:clubId/members" exact component={Members} props={childProps} />
      <AuthenticatedRoute path="/clubs/:clubId/members/create" exact component={MembersCreate} props={childProps} />
      <AuthenticatedRoute path="/clubs/:clubId/members/:memberId/edit" exact component={MembersEdit} props={childProps} />
      <AuthenticatedRoute path="/clubs/:clubId/members/:memberId/delete" exact component={MembersDelete} props={childProps} />

      {/* SHOWCASE */}
      <AuthenticatedRoute path="/buttons" exact component={Buttons} props={childProps} />
      {/* END OF SHOWCASE */}
      
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>

  if (hideSidebar) {
    return (
      <>
        {allRoutes}
      </>
    )
  } else {
    return (
      <Sidebar pageHeader={location.pathname}>
        {allRoutes}
      </Sidebar>
    )
  }
}

export default withRouter(Router);
