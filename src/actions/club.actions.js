import httpRequest, { axios } from '../helpers/httpRequest';
import {
  // CLUB_CREATE,
  CLUB_ADD_MEMBER,
  CLUB_UPDATE_MEMBER,
  // CLUB_REMOVE_MEMBER,
  // CLUB_SET_ALL
} from './types';

export const clubActions = {
  createClub,
  addToClub,
  updateMember,
  removeFromClub,
};

function createClub(club) {
  return function(dispatch) {
    return httpRequest('POST', '/v1/clubs/create', club)
      .then(user => {
        console.log('club: ', club);
        return club;
      })
      .catch(err => {
        console.log('err: ', err.response);
        const errorMessage = err.response.data.message;
        throw errorMessage;
      });
  };
}

function addToClub(name, email, file) {
  return async (dispatch, getState) => {
    const club = getState().club;

    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    const uploadConfig = await uploadAvatar(file);

    const res = await httpRequest('POST', `/v1/clubs/${club.current._id}/addMember`, {
      name,
      email,
      imageUrl: uploadConfig ? uploadConfig.key : undefined
    })

    console.log('res @ addToClub @ club.actions: ', res);
    dispatch({ type: CLUB_ADD_MEMBER, payload: res.club.members });
  };
}

async function uploadAvatar(file, previousImageUrl) {
  if (!file) { return false; }

  // Delete the previous avatar, if exists.
  if (previousImageUrl) {
    httpRequest('DELETE', '/v1/uploads/deleteAvatar', { url: previousImageUrl });
  }

  const uploadConfig = await httpRequest('POST', '/v1/uploads/getSignedUrl', { type: file.type });

  await axios.put(uploadConfig.url, file, {
    headers: {
      'Content-Type': file.type,
    }
  });
  
  return uploadConfig;
}

function updateMember(name, email, memberId, file, previousImageUrl) {
  return async (dispatch, getState) => {
    const club = getState().club;
    
    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    const uploadConfig = await uploadAvatar(file, previousImageUrl);

    const res = await httpRequest('PATCH', `/v1/clubs/${club.current._id}/updateMember/${memberId}`, {
      name,
      email,
      imageUrl: uploadConfig ? uploadConfig.key : undefined
    });

    console.log('res @ updateMember @ club.actions: ', res);
    dispatch({ type: CLUB_UPDATE_MEMBER, payload: res.club.members });
  };
}

function removeFromClub(memberId) {
  return function(dispatch, getState) {
    const club = getState().club
    
    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    return httpRequest('DELETE', `/v1/clubs/${club.current._id}/removeMember/${memberId}`)
      .then(res => {
        console.log('res @ addToClub @ club.actions: ', res);
        dispatch({ type: CLUB_ADD_MEMBER, payload: res.club.members });
      })
  };
}
