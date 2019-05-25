import httpRequest from '../helpers/httpRequest';
import { uploadFile, deleteFileByUrl } from '../helpers/uploadService';

import {
  MEMBER_SET_CURRENT,
	MEMBER_SET_FILTER,
	MEMBER_ADD,
	MEMBER_REMOVE,
	MEMBER_UPDATE,
  // CLUB_CREATE,
  // MEMBER_SET_ALL,
  // CLUB_SET_ALL
} from './types';

export const memberActions = {
  setCurrentMember,
	setMembersFilter,
	addMemberToClub,
	removeMemberFromClub,
	updateMember
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

function addMemberToClub(name, email, file) {
  return async (dispatch, getState) => {
    const club = getState().club;

    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    // First save the members avatar in S3 (folder: member-avatars)
    const uploadData = await uploadFile(file, 'member-avatars');

    const imageUrl = uploadData ? uploadData.key : undefined

    // Then save the member in DB
    const res = await httpRequest('POST', `/v1/clubs/${club.current._id}/members/create`, {
      name,
      email,
      imageUrl
    })

    dispatch({ type: MEMBER_ADD, payload: res.club.members });
  };
}

function removeMemberFromClub(memberId) {
  return function(dispatch, getState) {
    const club = getState().club
    
    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    return httpRequest('DELETE', `/v1/clubs/${club.current._id}/members/${memberId}`)
      .then(res => {
        console.log('res @ addToClub @ club.actions: ', res);
        dispatch({ type: MEMBER_REMOVE, payload: res.club.members });
      })
  };
}

function updateMember(name, email, memberId, file, previousImageUrl) {
  return async (dispatch, getState) => {
    const club = getState().club;
    
    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    console.log('file: ', file);

    // First save the members avatar in S3 (folder: member-avatars)
    const uploadData = await uploadFile(file, 'member-avatars');

    // Delete the previous avatar if a new one is added
    if (file) {
      await deleteFileByUrl(previousImageUrl);
    }

    console.log('uploadData: ', uploadData);

    const avatarUrl = uploadData
      ? uploadData.key
      : previousImageUrl
        ? previousImageUrl
        : null

    console.log('avatarUrl: ', avatarUrl);

    const data = await httpRequest('PATCH', `/v1/clubs/${club.current._id}/members/${memberId}`, {
      name,
      email,
      avatarUrl
    });

    dispatch({ type: MEMBER_UPDATE, payload: data.club.members });
  };
}