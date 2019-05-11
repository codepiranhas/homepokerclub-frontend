import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
// import registerServiceWorker from "./registerServiceWorker";
import { Provider } from 'react-redux';
import { persistStore, persistCombineReducers } from "redux-persist";
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from "redux-persist/lib/storage";
import thunkMiddleware from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
import NotificationProvider from './providers/NotificationProvider';
import App from "./App";

// CSS Reset (normalize)
import "./index.css";
// Importing all the reducers to pass in the store
import reducers from './reducers';
// Enabling Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunkMiddleware];

const persistConfig = {
  storage,
  key: 'root',
};

// 1st arg: all the reducers
// 2nd arg: initial state (optional)
// 3rd arg of our store: the middleaware
const store = createStore(
  persistCombineReducers(persistConfig, reducers),
  composeEnhancers(
    applyMiddleware(...middleware),
  )
);

const persistor = persistStore(store);

// registerServiceWorker();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <SnackbarProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </SnackbarProvider>
      </Router>
    </PersistGate>
  </Provider>, 
  document.querySelector('#root')
);
