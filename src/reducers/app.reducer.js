import { 
  APP_SET_PAGE_HEADER,
  APP_SET_MEMBERS_FILTER,
  APP_SET_STATE_INITIALIZED,
  APP_SET_STATE_INITIALIZING,
  APP_UNSET_STATE_INITIALIZING,
} from '../actions/types';

const defaultState = {
  isStateInitialized: false,
  isStateInitializing: false,
  currentPageHeader: null,
  membersFilter: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case APP_SET_PAGE_HEADER:
      return { ...state, currentPageHeader: action.payload };

    case APP_SET_MEMBERS_FILTER:
      return { ...state, membersFilter: action.payload };

    case APP_SET_STATE_INITIALIZED:
      return { ...state, isStateInitialized: true };

    case APP_SET_STATE_INITIALIZING:
      return { ...state, isStateInitializing: true };
    
      case APP_UNSET_STATE_INITIALIZING:
      return { ...state, isStateInitializing: false };

    default:
      return state;
  }
}
