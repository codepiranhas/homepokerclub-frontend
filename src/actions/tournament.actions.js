import httpRequest from '../helpers/httpRequest';
import {
  TOURNAMENT_SET_ALL,
  TOURNAMENT_CREATE,
  TOURNAMENT_SET_IS_LOADING,
  TOURNAMENT_SET_HAS_ERROR,
} from './types';

export const tournamentActions = {
  getTournaments,
  createTournament,
};

function getTournaments() {
  return function(dispatch, getState) {
    const club = getState().club;

    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    return httpRequest('GET', `/v1/tournaments/getAllByClubId/${club.current._id}`)
      .then(data => {
        console.log('data @ getTournaments @ tournament.actions: ', data);
        dispatch({ type: TOURNAMENT_SET_ALL, payload: data.tournaments });
        dispatch({ type: TOURNAMENT_SET_IS_LOADING, payload: false })
        return 'success';
      })
      .catch(err => {
        console.log('err: ', err.response);
        dispatch({ type: TOURNAMENT_SET_HAS_ERROR, payload: true })
        const errorMessage = err.response.data.message;
        throw errorMessage;
      });
  };
}

function createTournament(tournament) {
  return function(dispatch, getState) {
    const club = getState().club;

    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    const tournamentObj = { clubId: club.current._id, ...tournament }

    return httpRequest('POST', '/v1/tournaments/create', tournamentObj)
      .then(data => {
        console.log('data: ', data);
        dispatch({ type: TOURNAMENT_CREATE, payload: data.tournament });
        return tournament;
      })
      .catch(err => {
        console.log('err: ', err.response);
        const errorMessage = err.response.data.message;
        throw errorMessage;
      });
  };
}
