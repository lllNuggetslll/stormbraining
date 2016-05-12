import { GET_ACTIVEUSER, ADD_ACTIVEUSER, DELETE_ACTIVEUSER } from '../actions/action_types';

export default function (state = [], action) {
  switch (action.type) {
    case GET_ACTIVEUSER:
      return action.payload.data.user;

    case ADD_ACTIVEUSER:
      return state;

    case DELETE_ACTIVEUSER:
      return state;

    default:
      return state;
  }
}
