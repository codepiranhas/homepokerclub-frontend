import { combineReducers } from 'redux';
import user from './user.reducer.js';
import club from './club.reducer.js';

export default combineReducers({
  user: user,
  club: club
});
