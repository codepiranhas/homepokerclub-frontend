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

const P = styled.p`
  color: var(--c-gray-light50);
`;

class GuestAccess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
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

          <h2 className="space-above wide-space-below text-center">View your favorite club</h2>
          <P className="space-below">Type your clubs secret code below to gain access to the clubs page.</P>
          <br />

          <div className="space-below flex-1">
            <Input onChange={this.handleInputChange} name="code" size="small" type="text" placeholder="Secret Code" />
          </div>

          <P className="space-above">Ask the club owner for a valid code.</P>

          <div className="authentication__button_submit">
            <Button fullwidth type="onLogin" isLoading={this.state.isLoading}>Enter</Button>
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
    )(GuestAccess)
  )
);
