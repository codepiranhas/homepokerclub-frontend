import { 
  CLUB_CREATE,
  CLUB_SET_ALL,
  CLUB_SET_CURRENT,
  CLUB_UPDATE_LOGO,
  CLUB_UPDATE_DETAILS,
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

    case CLUB_UPDATE_DETAILS:
      return { 
        ...state, 
        current: { 
          ...state.current,
          ...action.payload
        },
        all: state.all.map(club => club._id === action.payload._id ? action.payload : club)
      };

    default:
      return state;
  }
}
