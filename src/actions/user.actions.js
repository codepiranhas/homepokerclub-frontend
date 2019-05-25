import httpRequest from '../helpers/httpRequest';
import {
  USER_LOGIN,
  USER_LOGOUT,
  CLUB_SET_ALL,
  CLUB_SET_CURRENT,
  APP_SET_STATE_INITIALIZED,
  MEMBER_SET_ALL,
} from './types';

export const userActions = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  validateResetPasswordToken,
  socialLogin,
};

function signup(user) {
  return function(dispatch) {
    return httpRequest('POST', '/v1/users/register', user)
      .then(user => {
        console.log('user: ', user);
        return user;
      })
  };
}

function login(user) {
  return function(dispatch) {
    return httpRequest('POST', '/v1/users/authenticate', user).then(user => {
      if (user.isVerified) {
        // Any initialization of the redux store should happen here
        dispatch({ type: CLUB_SET_ALL, payload: user.clubs });
        dispatch({ type: CLUB_SET_CURRENT, payload: user.clubs[0] });
        dispatch({ type: MEMBER_SET_ALL, payload: user.clubs[0].members });

        // Setting the user in redux and localstorage to preserve authentication state
        localStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: USER_LOGIN, payload: user });

        dispatch({ type: APP_SET_STATE_INITIALIZED, payload: true });

        return user;
      }
    });
  };
}

function socialLogin(data, callback) {
  return async dispatch => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      dispatch({ type: USER_LOGIN, payload: data.token });
      console.log('callback will fire!');
      callback();
    } else {
      return callback('error');
    }
  };
}

function logout() {
  localStorage.removeItem('user');

  return {
    type: USER_LOGOUT,
    payload: {},
  };
}

function forgotPassword(user) {
  return function(dispatch) {
    return httpRequest('POST', '/v1/users/forgotPassword', user)
      .then(data => {
        console.log('data @ forgotPassword action', data);
        return data.message;
      })
      .catch(err => {
        console.log('err @ forgotPassword action', err.response);
        return err.response.data.message;
      });
  };
}

function validateResetPasswordToken(data) {
  console.log('Validating the token: ', data);
  return function(dispatch) {
    return httpRequest('GET', `/v1/users/validateResetPasswordToken/${data.resetToken}`)
      .then(data => {
        console.log('response @ validate: ', data);
        return data.message;
      })
      .catch(err => {
        console.log('err @ validatePasswordToken action: ', err.response);
        throw err.response.data.message;
      });
  };
}

function resetPassword(data) {
  return function(dispatch) {
    return httpRequest('POST', '/v1/users/resetPassword', data)
      .then(data => {
        console.log('data @ resetPassword: ', data);
        return data.message;
      })
      .catch(err => {
        console.log('err @ resetPassword: ', err.response);
        return err.response.data.message;
      });
  };
}

function changePassword(oldPassword, newPassword) {
  return function(dispatch) {
    return httpRequest('POST', '/v1/users/changePassword', { oldPassword, newPassword })
      .then(data => {
        console.log('data @ changePassword: ', data);
        return data.message;
      })
      .catch(err => {
        console.log('err @ changePassword: ', err.response);
        return err.response.data.message;
      });
  };
}
