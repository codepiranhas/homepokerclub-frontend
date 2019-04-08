import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from './actions';
import Routes from "./routes/Routes";

/**
 * Global CSS configuration
 */
import "./App.css";

/**
 * FONT AWESOME ICON LIBRARY
 * Import any icons here so they are usable across all components
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPencilAlt, faSyncAlt, faFutbol, faTrophy, faCoins } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt, faPencilAlt, faSyncAlt, faFutbol, faTrophy, faCoins);

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    this.setState({ isAuthenticating: false });
  }

  handleLogout = async () => {
    console.log('this.props.dispatch: ', this.props.dispatch);
    console.log('userActions: ', userActions);
    this.props.logout(this.props.user);
  }

  render() {
    return (
      
        <Routes />
      
    );
  }
}

 function mapStateToProps({ user }) {
  return { user };
 }

export default withRouter(connect(mapStateToProps, userActions)(App));
