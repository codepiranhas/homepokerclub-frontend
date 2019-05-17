import { 
  MEMBER_SET_ALL,
  MEMBER_ADD,
  MEMBER_UPDATE,
  MEMBER_REMOVE,
} from '../actions/types';

const defaultState = {
  all: [],
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case MEMBER_SET_ALL:
      return  { ...state, all: [...action.payload] };
    case MEMBER_ADD:
      return { ...state, all: [...action.payload] };
    case MEMBER_UPDATE:
      return { ...state, all: [...action.payload] };
    case MEMBER_REMOVE:
      return { ...state, all: [...action.payload] };
    default:
      return state;
  }
}
