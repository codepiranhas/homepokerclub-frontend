import httpRequest from '../helpers/httpRequest';
import {
	APP_SET_PAGE_HEADER,
	APP_SET_MEMBERS_FILTER,
	APP_SET_STATE_INITIALIZED,
	APP_SET_STATE_INITIALIZING,
	CLUB_SET_ALL,
	CLUB_SET_CURRENT,
	MEMBER_SET_ALL,
} from './types';

export const appActions = {
	setPageHeader,
	setMembersFilter,
	initializeState
};

function setPageHeader(header) {
	return({
		type: APP_SET_PAGE_HEADER,
		payload: header
	})
}

function setMembersFilter(filterString) {
	return({
		type: APP_SET_MEMBERS_FILTER,
		payload: filterString
	})
}

function initializeState(data = {}) {
  return function(dispatch, getState) {
		const user = getState().user;
		const app = getState().app;

		console.log('user: ', user)

		if (app.isStateInitializing) {
			return true;
		}

		if (!user.token) {
			// TODO: Redirect to login if needed
			const errorMessage = 'An error occured.';
			throw errorMessage;
		}

		const dataToFetch = { userId: user._id, ...data }

		dispatch({ type: APP_SET_STATE_INITIALIZING, payload: true });

		httpRequest('POST', '/v1/users/initializeState', dataToFetch)
			.then(data => {
				console.log('data: ', data);
				
				if (data) {
					// Any initialization of the redux store should happen here
					dispatch({ type: CLUB_SET_ALL, payload: data.user.clubs });
					dispatch({ type: CLUB_SET_CURRENT, payload: data.user.clubs[0] });
					dispatch({ type: APP_SET_STATE_INITIALIZED, payload: true });
					dispatch({ type: APP_SET_STATE_INITIALIZING, payload: false });
					// dispatch({ type: APP_SET_STATE_INITIALIZING, payload: false });
					dispatch({ type: MEMBER_SET_ALL, payload: data.user.clubs[0].members });

					return true;
				}
			})
			.catch(err => {
				console.log('err @ initializeState @ app.actions: ', err);
				dispatch({ type: APP_SET_STATE_INITIALIZING, payload: false });
			})
  };
}

