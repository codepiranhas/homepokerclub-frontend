//import httpRequest from '../helpers/httpRequest';
import {
	APP_SET_PAGE_HEADER,
} from './types';

export const appActions = {
	setPageHeader,
};

function setPageHeader(header) {
	return({
		type: APP_SET_PAGE_HEADER,
		payload: header
	})
}

