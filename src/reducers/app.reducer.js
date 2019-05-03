import { 
  APP_SET_PAGE_HEADER,
} from '../actions/types';

const defaultState = {
  currentPageHeader: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case APP_SET_PAGE_HEADER:
      return { ...state, currentPageHeader: action.payload };

    default:
      return state;
  }
}
