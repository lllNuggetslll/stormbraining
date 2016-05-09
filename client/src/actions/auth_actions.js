import * as types from './action_types';

export function receiveLogout() {
  return {
    type: types.LOGOUT_SUCCESS,
    isAuthenticated: false,
  };
}

export function lockSuccess(profile, token) {
  return {
    type: types.LOCK_SUCCESS,
    profile,
    token,
  };
}

export function lockError(err) {
  return {
    type: types.LOCK_ERROR,
    err,
  };
}
