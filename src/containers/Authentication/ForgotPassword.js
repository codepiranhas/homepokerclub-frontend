import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components';
import posed from 'react-pose';
import { userActions } from '../../actions';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Authentication.css';

const Div = styled.div`
  position: absolute;
  color: var(--c-gray-light10);
  bottom: 0px;
  right: 30px;

  font-size: 220px;
`;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passwordRequested: false,
      isVisible: false
    };
  }

  componentDidMount() {
    console.log('ForgotPassword.js @ componentDidMount - this.props: ', this.props);
    this.setState({ isVisible: true });
  }

  handleInputChange = event => {
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [event.target.name]: event.target.value });
  };

  handleReset = async event => {
    event.preventDefault(); // Prevents the native functionality of the form

    this.props.forgotPassword({ email: this.state.email })
      .then(data => {
        this.setState({ passwordRequested: true });
      })
      .catch(err => {
        console.log('err: ', err);
      })
  }

  goBack = () => {
    this.props.history.push('/login')
  }

  renderForm() {
    return (
      <div className="authentication__form">
        <form onSubmit={this.handleReset}>
          {/* <div className="authentication__logo_mobile">
            <FontAwesomeIcon icon={'user-friends'} size="5x" />
          </div> */}

          <h2 className="space-above super-wide-space-below text-center">Reset my password.</h2>

          <div className="space-below flex-1">
            <Input onChange={this.handleInputChange} name="email" type="email" size="small" icon={'user-tie'} placeholder="Email" />
          </div>

          <div className="authentication__button_submit">
            <Button fullwidth type="onLogin" isLoading={this.state.isLoading}>Reset</Button>
          </div>
        </form>
      </div>
    );
  }

  renderFormSubmitted() {
    return (
      <div className="display-flex flex-direction-column flex-center-center text-center">
        <h1 className="wide-space-below">Nearly there!</h1>
        <h3>We have received your request. Please follow the instructions on the email we have just sent you.</h3>
      </div>
    )
  }

  renderFlormSubmitted() {
    return (
      <div className="login">
        <Div className="forgotPassword__form">
          <div className="forgotPassword__requestInfo">
            <h1>Request received!</h1>
            <h3>Please check your email and follow the instructions.</h3>
          </div>

          <Div className="forgotPassword__requestBack">
            <Button variant="contained" color="primary" type="submit" fullWidth onClick={this.goBack}>Back</Button>
          </Div>

        </Div>
      </div>
    )
  }

  render() {
    return (
      <>
        { !this.state.passwordRequested
            ? this.renderForm()
            : this.renderFormSubmitted()
        }
      </>
    );
  }

}

function mapStateToProps(state) {
  return { errorLogin: state.user.errorLogin };
 }

export default withRouter(connect(mapStateToProps, userActions)(ForgotPassword));