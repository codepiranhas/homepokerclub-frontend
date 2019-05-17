import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from './actions';
import Routes from './routes/Routes';
// import ErrorBoundary from './helpers/ErrorBoundary';
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
  faEnvelope,
  faUserPlus,
  faSearch,
  faUserTie,
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
  faEnvelope,
  faUserPlus,
  faSearch,
  faUserTie,
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: true,
    };
  }

  componentDidMount() {
    this.setState({ isAuthenticating: false });
  }

  render() {
    return (
      // <ErrorBoundary>
        <Routes />
      // </ErrorBoundary>
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
