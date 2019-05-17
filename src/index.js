import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import { persistStore, persistCombineReducers } from "redux-persist";
// import { PersistGate } from 'redux-persist/es/integration/react';
// import storage from "redux-persist/lib/storage";
import thunkMiddleware from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
import NotificationProvider from './providers/NotificationProvider';
// import registerServiceWorker from "./registerServiceWorker";
import ErrorBoundary from './helpers/ErrorBoundary';
import App from "./App";

// CSS Reset (normalize)
import "./index.css";

// Importing all the reducers to pass in the store
import reducers from './reducers';

// Enabling Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// All redux middleware to pass in the store
const middleware = [thunkMiddleware];

/**
 * With redux-persist
 */

// const persistConfig = {
//   storage,
//   key: 'root',
// };
//

// const store = createStore(
//   persistCombineReducers(persistConfig, reducers),
//   composeEnhancers(
//     applyMiddleware(...middleware),
//   )
// );
//
// const persistor = persistStore(store);

// Without redux-persist
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(...middleware)
  ));

// registerServiceWorker();
ReactDOM.render(
  <Provider store={store}>
  {/* <PersistGate persistor={persistor}> */}
    <Router>
      <SnackbarProvider>
        <NotificationProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </NotificationProvider>
      </SnackbarProvider>
    </Router>
  {/* </PersistGate> */}
  </Provider>, 
  document.querySelector('#root')
);
