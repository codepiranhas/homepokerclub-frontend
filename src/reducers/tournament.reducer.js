import { 
  TOURNAMENT_SET_ALL,
  TOURNAMENT_CREATE,
  TOURNAMENT_SET_IS_LOADING,
  TOURNAMENT_SET_HAS_ERROR,
} from '../actions/types';

const defaultState = {
  all: [],
  current: null,
  isLoading: true,
  hasError: false,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case TOURNAMENT_SET_ALL:
      return { ...state, all: action.payload };
    case TOURNAMENT_CREATE:
      return { ...state, all: [action.payload, ...state.all] };
    case TOURNAMENT_SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case TOURNAMENT_SET_HAS_ERROR:
      return { ...state, hasError: action.payload };
    default:
      return state;
  }
}
