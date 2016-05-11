import { GET_MESSAGES, ADD_MESSAGE } from '../actions/action_types';

export default function (state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload.data.messages;

    case ADD_MESSAGE:
      return state;

    default:
      return state;
  }

}
