import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import posed from 'react-pose';
import { userActions } from '../../actions';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import { withNotifications } from '../../hocs/WithNotifications';

import Button from '../../components/Button/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Authentication.css';

const Container = styled.div`
  @media (max-width: 700px) {
    height: 100%;
  }
`;

const MobileAppLogo = styled.div`
  display: none;

  @media (max-width: 700px) {
    display: initial;
    margin: 50px 0px 20px 0px;
  }
`;

const Form = styled.form`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  margin-top: 50px;

  @media (max-width: 700px) {
    height: 100%;
    margin-top: 0px;

    display: flex;
    align-items: flex-end;
    padding-bottom: 90px;
  }
`;

const Div = styled.div`
  position: absolute;
  color: var(--c-gray-light10);
  bottom: 0px;
  right: 30px;

  font-size: 220px;
`;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordRepeated: "",
      confirmationCode: "",
      newUser: null,
      modalIsOpen: false,
      signedUp: false,
      isVisible: false,
    };
  }
  
  componentDidMount() {
    this.setState({ isVisible: true })
    console.log('this.props: ', this.props);
    console.log('userActions: ', userActions);
  }

  // createNotification = ({text, type = 'default' }) => {
  //   this.props.enqueueSnackbar(text, { 
  //     variant: type, 
  //     anchorOrigin: { vertical: 'top', horizontal: 'center'} 
  //   });
  // }

  handleInputChange = event => {
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [event.target.name]: event.target.value });
  };

  toggle = e =>
    this.setState(state => ({
      index: state.index === 2 ? 0 : state.index + 1,
    }))


  handleRegister = async (event) => {
    event.preventDefault();

    this.props.signup({ email: this.state.email, password: this.state.password })
      .then(user => {
        this.setState({ signedUp: true });
      })
      .catch(err => { 
        this.props.notifications.showError(err.response.data.message);
      })
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.passwordRepeated
    );
  }

  goBack = () => {
    this.props.history.push('/login')
  }

  renderForm() {
    return (
      <div className="authentication__form">
        <form onSubmit={this.handleRegister}>
          <div className="authentication__logo_mobile">
            <FontAwesomeIcon icon={'user-friends'} size="5x" />
          </div>

          <h2 className="space-above super-wide-space-below text-center">Create a free account.</h2>

          <div className="space-below flex-1">
            <Input onChange={this.handleInputChange} name="email" type="email" size="small" icon={'user-tie'} placeholder="Email" />
          </div>

          <div className="flex-1">
            <Input onChange={this.handleInputChange} name="password" type="password" size="small" icon={'unlock-alt'} placeholder="Password" />
          </div>

          <div className="authentication__button_submit">
            <Button fullwidth type="onLogin" isLoading={this.state.isLoading}>Register</Button>
          </div>
        </form>
      </div>
    );
  }

  renderFormSubmitted() {
    return (
      <div className="display-flex flex-direction-column flex-center-center text-center">
        <h1 className="space-below">Account created.</h1>
        <h3>Please check your email to verify your account and continue.</h3>
      </div>
    )
  }

  render() {
    return (
      <>
      { !this.state.signedUp
          ? this.renderForm()
          : this.renderFormSubmitted()
      }
      </>

    )
  }
}

function mapStateToProps(state) {
  return { errorSignup: state.user.errorSignup };
 }
 
 /* 
 * Optimized by grabbing only the piece of state needed
 *
 * function mapStateToProps({ auth }) {
 *   return { errorMessage: auth.errorMessage };
 * }
 */
 
 export default withNotifications(withRouter(connect(mapStateToProps, userActions)(Register)));

