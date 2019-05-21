import { 
  CLUB_CREATE,
  CLUB_SET_ALL,
  CLUB_SET_CURRENT,
  CLUB_UPDATE_LOGO
} from '../actions/types';

const defaultState = {
  all: [],
  current: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case CLUB_CREATE:
      return { ...state, ...action.payload };

    case CLUB_SET_ALL:
      return { ...state, all: action.payload };

    case CLUB_SET_CURRENT:
      return { ...state, current: action.payload };

    case CLUB_UPDATE_LOGO:
      return { 
        ...state, 
        current: { 
          ...state.current,
          logoUrl: action.payload
        }
      };
    default:
      return state;
  }
}
