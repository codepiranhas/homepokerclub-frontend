import httpRequest from '../helpers/httpRequest';
import { uploadFile, deleteFileByUrl } from '../helpers/uploadService';
import {
  // CLUB_CREATE,
  CLUB_UPDATE_LOGO,
  CLUB_UPDATE_DETAILS,
} from './types';

export const clubActions = {
  createClub,
  updateLogo,
  updateClubDetails,
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

function updateLogo(file, previousImageUrl) {
  return async (dispatch, getState) => {
    const club = getState().club;

    if (!file) { return; }

    // First save the clubs logo in S3 (folder: club-logos)
    const uploadData = await uploadFile(file, 'club-logos');

    // Then delete the previous logo
    await deleteFileByUrl(previousImageUrl);

    const imageUrl = uploadData.key;

    const data = await httpRequest('PATCH', `/v1/clubs/${club.current._id}/updateLogo`, {
      imageUrl
    });

    dispatch({ type: CLUB_UPDATE_DETAILS, payload: data.club });

    return true;
  };
}

function updateClubDetails(details) {
  return async (dispatch, getState) => {
    const club = getState().club;
    const { clubName } = details;

    const data = await httpRequest('PATCH', `/v1/clubs/${club.current._id}/updateDetails`, {
      clubName
    });

    dispatch({ type: CLUB_UPDATE_DETAILS, payload: data.club });

    return true;
  };
}