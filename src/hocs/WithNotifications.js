import React from 'react';
import { NotificationContext } from '../providers/NotificationProvider';

// This function takes a component...
export function withNotifications(Component) {
  // ...and returns another component...
  return function StatefullComponent(props) {
    // ... and renders the wrapped component with the context state!
    // Notice that we pass through any additional props as well
    return (
      <NotificationContext.Consumer>
        {state => <Component {...props} notifications={state} />}
      </NotificationContext.Consumer>
    );
  };
}