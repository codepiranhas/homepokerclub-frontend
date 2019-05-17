import httpRequest from '../helpers/httpRequest';
import {
  TOURNAMENT_GET_ALL,
  TOURNAMENT_CREATE
} from './types';

export const tournamentActions = {
  createTournament
};

function createTournament(tournament) {
  return function(dispatch, getState) {
    const club = getState().club;

    if (!club.current) {
      const errorMessage = 'An error occured.';
      throw errorMessage;
    }

    const tournamentObj = { clubId: club.current._id, ...tournament }

    return httpRequest('POST', '/v1/tournaments/create', tournamentObj)
      .then(tournament => {
        console.log('tournament: ', tournament);
        dispatch({ type: TOURNAMENT_CREATE, payload: tournament });
        return tournament;
      })
      .catch(err => {
        console.log('err: ', err.response);
        const errorMessage = err.response.data.message;
        throw errorMessage;
      });
  };
}
