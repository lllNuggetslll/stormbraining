import * as types from '../actions/action_types';

const idToken = localStorage.getItem('id_token');
const INITIAL_STATE = {
  isAuthenticated: idToken && idToken !== 'null' ? true : false,
  errorMessage: '',
  profile: JSON.parse(localStorage.getItem('profile')),
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOCK_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        profile: action.profile,
      });

    case types.LOCK_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.err.message,
        profile: {},
      });

    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: '',
        profile: {},
      });

    case types.SAVE_OR_FETCH_USER:
      return state;

    default:
      return state;
  }
}
