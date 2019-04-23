import httpRequest from '../helpers/httpRequest';
// import {
//   CLUB_CREATE
// } from './types';

export const clubActions = {
  createClub,
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
