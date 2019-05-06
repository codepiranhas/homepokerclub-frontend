import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from './actions';
import Routes from './routes/Routes';
import ErrorBoundary from './helpers/ErrorBoundary';
import './App.css';

/**
 * FONT AWESOME ICON LIBRARY
 * Import any icons here so they are usable across all components
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashAlt,
  faPencilAlt,
  faEdit,
  faSyncAlt,
  faTrophy,
  faTimes,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

import {
  faInstagram,
  faTwitter,
  faFacebook,
  faFacebookF,
  faFacebookSquare
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faTrashAlt,
  faPencilAlt,
  faEdit,
  faSyncAlt,
  faTrophy,
  faTimes,
  faInstagram,
  faTwitter, 
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faEnvelope
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: true,
    };
  }

  async componentDidMount() {
    this.setState({ isAuthenticating: false });
  }

  handleLogout = async () => {
    console.log('this.props.dispatch: ', this.props.dispatch);
    console.log('userActions: ', userActions);
    this.props.logout(this.props.user);
  };

  render() {
    return (
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(
  connect(
    mapStateToProps,
    userActions
  )(App)
);
