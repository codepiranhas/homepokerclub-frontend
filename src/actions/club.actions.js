import httpRequest from '../helpers/httpRequest';
import { uploadFile, deleteFileByUrl } from '../helpers/uploadService';
import {
  // CLUB_CREATE,
  CLUB_UPDATE_DETAILS,
} from './types';

export const clubActions = {
  createClub,
  updateClubLogo,
  updateClubName,
};

function createClub(club) {
  return function(dispatch) {
    return httpRequest('POST', '/v1/clubs/create', club)
      .then(club => {
        return club;
      })
      .catch(err => {
        console.log('err: ', err.response);
        const errorMessage = err.response.data.message;
        throw errorMessage;
      });
  };
}

function updateClubLogo(file, previousImageUrl) {
  return async (dispatch, getState) => {
    const club = getState().club;

    if (!file) { return; }

    // First save the clubs logo in S3 (folder: club-logos)
    const uploadData = await uploadFile(file, 'club-logos');

    // Then delete the previous logo
    await deleteFileByUrl(previousImageUrl);

    const logoUrl = uploadData.key;

    const data = await httpRequest('PATCH', `/v1/clubs/${club.current._id}`, {
      logoUrl
    });

    dispatch({ type: CLUB_UPDATE_DETAILS, payload: data.club });

    return true;
  };
}

function updateClubName(name) {
  return async (dispatch, getState) => {
    const club = getState().club;

    const data = await httpRequest('PATCH', `/v1/clubs/${club.current._id}`, {
      name
    });

    dispatch({ type: CLUB_UPDATE_DETAILS, payload: data.club });

    return true;
  };
}