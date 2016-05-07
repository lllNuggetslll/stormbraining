// import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SHOW_LOCK, LOCK_SUCCESS, LOCK_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS } from './action_types';

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  };
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

export function logoutUser() {
  let lock = new Auth0Lock('iGakh4fZgCCXIcn6M9Pe5lxsH3aFSaUY', 'nuggets.auth0.com');
  lock.logout({ ref: window.location.href });
  console.log(window.location.href);
}

export function showLock() {
  return {
    type: SHOW_LOCK,
  };
}

export function lockSuccess(profile, token) {
  return {
    type: LOCK_SUCCESS,
    profile,
    token,
  };
}

export function lockError(err) {
  return {
    type: LOCK_ERROR,
    err,
  };
}


export function login() {

  let lock = new Auth0Lock('7knLLEidEQiUBihGrdb8GKVtNnfPF1A5', 'comparable.auth0.com');

    return dispatch => {
      lock.show((err, profile, token) => {
     // If we receive an error, we dispatch the lockError action
        if (err) {
          dispatch(lockError(err));
          return;
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', token);
        dispatch(lockSuccess(profile, token));
    });
  };
}

