import { 
  MEMBER_SET_ALL,
  MEMBER_ADD,
  MEMBER_UPDATE,
  MEMBER_REMOVE,
  MEMBER_SET_CURRENT,
  MEMBER_SET_FILTER,
} from '../actions/types';

const defaultState = {
  all: [],
  current: null
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

    case MEMBER_SET_CURRENT:
      const currentMember = action.payload ? { ...action.payload } : null
      return { ...state, current: currentMember };
    
    case MEMBER_SET_FILTER:
      return { ...state, membersFilter: action.payload };

    default:
      return state;
  }
}
