import httpRequest from '../helpers/httpRequest';
import {
	APP_SET_PAGE_HEADER,
	APP_SET_STATE_INITIALIZED,
	APP_SET_STATE_INITIALIZING,
	CLUB_SET_ALL,
	CLUB_SET_CURRENT,
	MEMBER_SET_ALL,
	USER_LOGOUT,
} from './types';

export const appActions = {
	setPageHeader,
	initializeState
};

function setPageHeader(header) {
	return({
		type: APP_SET_PAGE_HEADER,
		payload: header
	})
}

function initializeState(history, data = {}) {
  return function(dispatch, getState) {
		const user = getState().user;
		const app = getState().app;

		if (app.isStateInitializing) {
			return;
		}

		const dataToFetch = { userId: user._id, ...data }

		dispatch({ type: APP_SET_STATE_INITIALIZING, payload: true });

		httpRequest('POST', '/v1/users/initializeState', dataToFetch)
			.then(data => {
				if (data) {
					// Any initialization of the redux store should happen here
					dispatch({ type: CLUB_SET_ALL, payload: data.user.clubs });
					dispatch({ type: CLUB_SET_CURRENT, payload: data.user.clubs[0] });
					dispatch({ type: MEMBER_SET_ALL, payload: data.user.clubs[0].members });
					dispatch({ type: APP_SET_STATE_INITIALIZED, payload: true });
					dispatch({ type: APP_SET_STATE_INITIALIZING, payload: false });
					return;
				} else {
					// Should never come here, but if we are unable to initialize the state
					// then we logout the user and redirect to login page.
					localStorage.removeItem('user');
					history.replace('/login');
					window.location.replace(window.location.href);
				}
			})
			.catch(err => {
				console.log('err @ initializeState @ app.actions: ', err);
				dispatch({ type: APP_SET_STATE_INITIALIZING, payload: false });
			})
  };
}

