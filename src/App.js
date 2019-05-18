import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { appActions } from './actions';
import Routes from './routes/Routes';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
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
  componentDidMount() {
    const { app, user } = this.props;

    if (!app.isStateInitialized && user.token) {
      // If the app is not initialized but the user is logged in,
      // (when user doesn't come from login, but from a bookmark / refresh)
      // then we call an action that initializes the must-have content of the state.
      this.props.initializeState();
    }
  }

  renderLoading() {
    return (
      <LoadingIndicator />
    )
  }

  render() {
    const { app, user } = this.props;

    if (!app.isStateInitialized && user.token) {
      return this.renderLoading();
    }

    return (
      <Routes />
    );
  }
}

function mapStateToProps({ user, app }) {
  return { user, app };
}

export default withRouter(
  connect(
    mapStateToProps,
    { ...appActions }
  )(App)
);
