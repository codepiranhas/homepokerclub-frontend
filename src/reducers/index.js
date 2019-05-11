import user from './user.reducer.js';
import club from './club.reducer.js';
import app from './app.reducer.js';

const reducers = {
  app,
  user,
  club,
};

export default reducers;


/**
 * Old implementation that was breaking if used with redux-persist.
 * Because redux-persist uses its own combineReducersPersist where
 * it is implememented (index.js)
 */

// import { combineReducers } from 'redux';
// import user from './user.reducer.js';
// import club from './club.reducer.js';
// import app from './app.reducer.js';

// export default combineReducers({
//   app,
//   user,
//   club,
// });
