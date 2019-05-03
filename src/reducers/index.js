import { combineReducers } from 'redux';
import user from './user.reducer.js';
import club from './club.reducer.js';
import app from './app.reducer.js';

export default combineReducers({
  app,
  user,
  club,
});
