import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
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
import history from './helpers/history';

// CSS Reset (normalize)
import "./index.css";

// Import all the reducers to pass in the store
import reducers from './reducers';

// Enable Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Gather all redux middleware to pass in the store
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

/**
 *  Without redux-persist
 */
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(...middleware)
  ));

// registerServiceWorker();
ReactDOM.render(
  <Provider store={store}>
  {/* <PersistGate persistor={persistor}> */}
    <Router history={history}>
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
