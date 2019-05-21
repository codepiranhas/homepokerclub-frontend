import httpRequest from '../helpers/httpRequest';
import { uploadFile, deleteFileByUrl } from '../helpers/uploadService';
import {
  // CLUB_CREATE,
  MEMBER_ADD,
  MEMBER_UPDATE,
  MEMBER_REMOVE,
  CLUB_UPDATE_LOGO
} from './types';

export const clubActions = {
  createClub,
  addToClub,
  updateMember,
  removeFromClub,
  updateLogo,
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

    // First save the members avatar in S3 (folder: member-avatars)
    const uploadData = await uploadFile(file, 'member-avatars');

    const imageUrl = uploadData ? uploadData.key : undefined

    // Then save the member in DB
    const res = await httpRequest('POST', `/v1/clubs/${club.current._id}/addMember`, {
      name,
      email,
      imageUrl
    })

    dispatch({ type: MEMBER_ADD, payload: res.club.members });
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

function updateMember(name, email, memberId, file, previousImageUrl) {
  return async (dispatch, getState) => {
    const club = getState().club;
    
    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    // First save the members avatar in S3 (folder: member-avatars)
    const uploadData = await uploadFile(file, 'member-avatars');

    // Then delete the previous avatar
    await deleteFileByUrl(previousImageUrl);

    const imageUrl = uploadData
      ? uploadData.key
      : previousImageUrl
        ? previousImageUrl
        : null

    const data = await httpRequest('PATCH', `/v1/clubs/${club.current._id}/updateMember/${memberId}`, {
      name,
      email,
      imageUrl
    });

    dispatch({ type: MEMBER_UPDATE, payload: data.club.members });
  };
}

function updateLogo(file, previousImageUrl) {
  return async (dispatch, getState) => {
    const club = getState().club;

    console.log('in here with file: ', file);
    
    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    if (!file) { return; }

    // First save the clubs logo in S3 (folder: club-logos)
    const uploadData = await uploadFile(file, 'club-logos');

    // Then delete the previous logo
    await deleteFileByUrl(previousImageUrl);

    const imageUrl = uploadData.key;

    console.log('updating club');

    await httpRequest('PATCH', `/v1/clubs/${club.current._id}/updateLogo`, {
      imageUrl
    });

    console.log('club updated');

    dispatch({ type: CLUB_UPDATE_LOGO, payload: uploadData.key });

    return true;
  };
}
