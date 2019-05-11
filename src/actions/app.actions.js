//import httpRequest from '../helpers/httpRequest';
import {
	APP_SET_PAGE_HEADER,
	APP_SET_MEMBERS_FILTER,
} from './types';

export const appActions = {
	setPageHeader,
	setMembersFilter,
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

