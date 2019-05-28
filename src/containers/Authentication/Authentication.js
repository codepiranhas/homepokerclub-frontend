import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import posed from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userActions } from '../../actions';
import { withNotifications } from '../../hocs/WithNotifications';

import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';

import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import NotFound from './NotFound';

import './Authentication.css';
import GuestAccess from './GuestAccess';


// const AnimationContainer = posed.div({
//   visible: { staggerChildren: 50 },
// });

// const Div = posed.div({
//   visible: { y: 0, opacity: 1, transition: { duration: 500 } },
//   hidden: { y: 20, opacity: 0 },
// });

// const BlackDiv = posed.div({
//   normal: { x: 0 },
//   away: { x: -300 },
// });

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isVisible: false,
    };
  }

  componentDidMount() {
    console.log('Authentication.js @ componentDidMount - this.props: ', this.props);
    this.setState({ isVisible: true });
  }

  inputHandler = event => {
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [event.target.name]: event.target.value });
  };

  loginHandler = async event => {
    event.preventDefault(); // Prevents the native functionality of the form

    this.setState({ isLoading: true });

    this.props
      .login({ email: this.state.email, password: this.state.password })
      .then(user => {
        if (!user.isFirstLogin) {
          this.props.notifications.showSuccess('Welcome back!');
        }
      })
      .catch(err => {  
        this.props.notifications.showError(err.response.data.message);
        this.setState({ isLoading: false }, () => {});
      });
  };

  render() {
    return (
        <div className="authentication-component">
          <div className="authentication__active-space">
            <div className="authentication__sidebar">
              <Sidebar />
            </div>
            <div className="authentication__body">
              <Switch>
                <Route path={`${this.props.match.path}/login`} exact component={Login} />
                <Route path={`${this.props.match.path}/register`}exact component={Register} />
                <Route path={`${this.props.match.path}/forgotpassword`}exact component={ForgotPassword} />
                <Route path={`${this.props.match.path}/guest`}exact component={GuestAccess} />

                { /* Finally, catch all unmatched routes */ }
                <Route component={NotFound} />
              </Switch>
            </div>

            <div className="authentication__background_icon">
              <FontAwesomeIcon icon={'user-friends'} />
            </div>

            <div className="authentication__sidebar_mobile">
              <SidebarMobile />
            </div>
          </div>
        </div> 
    );
  }
}

function mapStateToProps(state) {
  return { errorLogin: state.user.errorLogin };
}

export default withNotifications(
  withRouter(
    connect(
      mapStateToProps,
      userActions
    )(Authentication)
  )
);
