import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import posed from 'react-pose';
import { userActions } from '../../actions';
import { withNotifications } from '../../hocs/WithNotifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../../components/Input/Input';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import './Authentication.css';

const StyledLink = styled(Link)`
  color: var(--c-gray-light);
`;

class Login extends Component {
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
    console.log('Login.js @ componentDidMount - this.props: ', this.props);
    this.setState({ isVisible: true });
  }

  handleInputChange = event => {
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = async event => {
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

  onLogin = () => {
    console.log('login now')
  }

  render() {
    return (
      <div className="authentication__form">
        <form onSubmit={this.handleLogin}>
          <div className="authentication__logo_mobile">
            <FontAwesomeIcon icon={'user-friends'} size="5x" />
          </div>

          <h2 className="space-above super-wide-space-below text-center">Login to my account.</h2>

          <div className="space-below flex-1">
            <Input onChange={this.handleInputChange} name="email" type="email" size="small" icon={'user-tie'} placeholder="Email" />
          </div>

          <div className="flex-1">
            <Input onChange={this.handleInputChange} name="password" type="password" size="small" icon={'unlock-alt'} placeholder="Password" />
          </div>

          <div className="space-above display-flex flex-justify-end flex-1 fullwidth">
            <StyledLink to="/authentication/forgotpassword">Forgot Password</StyledLink>
          </div>

          <div className="authentication__button_submit">
            <Button fullwidth type="onLogin" isLoading={this.state.isLoading}>Login</Button>
          </div>
        </form>
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
    )(Login)
  )
);
