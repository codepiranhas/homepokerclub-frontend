import { 
  CLUB_CREATE,
} from '../actions/types';

const defaultState = {};

export default function(state = defaultState, action) {
  // console.log('action @ club.reducer: ', action);

  switch (action.type) {
    case CLUB_CREATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
