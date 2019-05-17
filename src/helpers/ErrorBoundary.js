import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { withNotifications } from '../hocs/WithNotifications';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    console.log('--- error boundary ---: ', props);
  }

  componentDidCatch(error, info) {
    console.log('ERROR BOUNDARY - error: ', error);
    console.log('ERROR BOUNDARY - info: ', info);

  this.props.history.replace('/');
  
  // Display fallback UI
  this.setState({ hasError: true });
  }

  redirectHome() {
    setTimeout(() => {
      const url = window.location.href;
      window.location.replace(url);
    }, 3000);
  }

  render() {
    if (this.state.hasError) {
      this.redirectHome()
      // You can render any custom fallback UI
      return (
        <div class="fullheight display-flex flex-center-center flex-direction-column">
          <h1 class="space-below"> Oh no! Something went terribly wrong.</h1>
          <h2>Redirecting you back home...</h2>
        </div>
      )
    }
    return this.props.children;
  }
}

export default withRouter(withNotifications(ErrorBoundary));
