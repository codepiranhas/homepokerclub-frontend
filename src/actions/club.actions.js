import httpRequest from '../helpers/httpRequest';
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

function addToClub(name, email) {
  return function(dispatch, getState) {
    const club = getState().club;
    
    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    return httpRequest('POST', `/v1/clubs/${club.current._id}/addMember`, { name, email })
      .then(res => {
        console.log('res @ addToClub @ club.actions: ', res);
        dispatch({ type: CLUB_ADD_MEMBER, payload: res.club.members });
        // return club;
      })
      .catch(err => {
        console.log('err @ addToClub @ club.actions: ', err.response);
        // const errorMessage = err.response.data.message;
        // throw errorMessage;
      });
  };
}

function updateMember(name, email, memberId) {
  return function(dispatch, getState) {
    const club = getState().club;
    
    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    return httpRequest('PATCH', `/v1/clubs/${club.current._id}/updateMember/${memberId}`, { name, email })
      .then(res => {
        console.log('res @ updateMember @ club.actions: ', res);
        dispatch({ type: CLUB_UPDATE_MEMBER, payload: res.club.members });
        // return club;
      })
      .catch(err => {
        console.log('err @ updateMember @ club.actions: ', err.response);
        // const errorMessage = err.response.data.message;
        // throw errorMessage;
      });
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
