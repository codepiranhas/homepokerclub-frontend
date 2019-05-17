import { 
  TOURNAMENT_GET_ALL,
  TOURNAMENT_CREATE,
} from '../actions/types';

const defaultState = {
  all: [],
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case TOURNAMENT_GET_ALL:
      return { ...state, ...action.payload };
    case TOURNAMENT_CREATE:
      return { ...state, all: [action.payload, ...state.all] };
    default:
      return state;
  }
}
