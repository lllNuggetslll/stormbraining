import { LOGOUT_SUCCESS, LOCK_SUCCESS, LOCK_ERROR } from '../actions/action_types';

const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  errorMessage: '',
  profile: JSON.parse(localStorage.getItem('profile')),
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOCK_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        profile: action.profile,
      });
    case LOCK_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.err,
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: '',
      });

    default:
      return state;
  }
}
