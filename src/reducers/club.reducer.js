import { 
  CLUB_CREATE,
  CLUB_SET_ALL,
  CLUB_SET_CURRENT,
  CLUB_ADD_MEMBER,
  CLUB_UPDATE_MEMBER,
} from '../actions/types';

const defaultState = {
  all: [],
  current: null
};

export default function(state = defaultState, action) {
  console.log('action @ club.reducer: ', action);

  switch (action.type) {
    case CLUB_CREATE:
      return { ...state, ...action.payload };
    case CLUB_SET_ALL:
      return { ...state, all: action.payload };
    case CLUB_SET_CURRENT:
      return { ...state, current: action.payload };
    case CLUB_ADD_MEMBER:
      return { ...state, current: { ...state.current, members: action.payload }};
      case CLUB_UPDATE_MEMBER:
      return { ...state, current: { ...state.current, members: action.payload }};
    default:
      return state;
  }
}
