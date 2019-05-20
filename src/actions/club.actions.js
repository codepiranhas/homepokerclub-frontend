import httpRequest, { axios } from '../helpers/httpRequest';
import {
  // CLUB_CREATE,
  MEMBER_ADD,
  MEMBER_UPDATE,
  MEMBER_REMOVE,
  SAVE_LOGO,
} from './types';

export const clubActions = {
  createClub,
  addToClub,
  updateMember,
  removeFromClub,
  saveLogo,
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

    dispatch({ type: MEMBER_ADD, payload: res.club.members });
  };
}

async function saveLogo(file, previousImageUrl) {
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
      imageUrl: uploadConfig ? uploadConfig.key : previousImageUrl ? previousImageUrl : undefined
    });

    console.log('res @ updateMember @ club.actions: ', res);
    dispatch({ type: MEMBER_UPDATE, payload: res.club.members });
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
        dispatch({ type: MEMBER_REMOVE, payload: res.club.members });
      })
  };
}
