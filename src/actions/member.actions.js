// import httpRequest, { axios } from '../helpers/httpRequest';
import {
  MEMBER_SET_CURRENT,
  MEMBER_SET_FILTER,
  // CLUB_CREATE,
  // MEMBER_SET_ALL,
  // CLUB_SET_ALL
} from './types';

export const memberActions = {
  setCurrentMember,
  setMembersFilter,
};


function setCurrentMember(member) {
	return({
		type: MEMBER_SET_CURRENT,
		payload: member
	})
}

function setMembersFilter(filterString) {
	return({
		type: MEMBER_SET_FILTER,
		payload: filterString
	})
}
