import React, { Component } from 'react';
import { withNotifications } from '../hocs/WithNotifications';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log('ERROR BOUNDARY - error: ', error);
    console.log('ERROR BOUNDARY - info: ', info);
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default withNotifications(ErrorBoundary);
