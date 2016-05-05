import {
  NEW_IDEA,
  GET_ONE_BOARD,
  UP_VOTE,
  DELETE_IDEA,
  CLEAR_BOARD_VIEW,
  REFRESH_BOARD_VIEW,
} from '../actions/action_types';

const INITIAL_STATE = { id: '', title: '', ideas: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_IDEA:
      return state;

    case GET_ONE_BOARD:
      return action.payload.data.board;

    case UP_VOTE:
      return state;

    case DELETE_IDEA:
      return state;

    case CLEAR_BOARD_VIEW:
      return INITIAL_STATE;

    case REFRESH_BOARD_VIEW:
      const changedIdea = action.payload;
      let updateComplete = false;

      // if (changedIdea.boardId !== state.id) {
      //   return state;
      // }

      // Update idea based on whether or not it is marked toBeDeleted and by matching ids
      const updatedIdeas = state.ideas.reduce((memo, idea) => {
        if (idea.id === changedIdea.id) {
          if (!changedIdea.toBeDeleted) {
            memo.push(changedIdea);
          }
          updateComplete = true;
        } else {
          memo.push(idea);
        }
        return memo;
      }, []);

      // Add new idea if changedIdea id did not matching existing ids
      if (!updateComplete && !changedIdea.toBeDeleted) {
        updatedIdeas.push(changedIdea);
      }

      return { ...state, ideas: updatedIdeas };

    default:
      return state;
  }
}
