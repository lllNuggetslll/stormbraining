import { NEW_BOARD, GET_BOARDS, DELETE_BOARD, REFRESH_ALL_BOARDS } from '../actions/action_types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_BOARD:
      return state;

    case GET_BOARDS:
      return action.payload.data.boards;

    case DELETE_BOARD:
      return state;

    case REFRESH_ALL_BOARDS:
      const changedBoard = action.payload;
      let updateComplete = false;

      // Update board based on whether or not it is marked toBeDeleted and by matching ids
      const updatedBoards = state.reduce((memo, board) => {
        if (board.id === changedBoard.id) {
          if (!changedBoard.toBeDeleted) {
            memo.push(changedBoard);
          }
          updateComplete = true;
        } else {
          memo.push(board);
        }
        return memo;
      }, []);

      // Add new board if changedBoard id did not matching existing ids
      if (!updateComplete && !changedBoard.toBeDeleted) {
        updatedBoards.push(changedBoard);
      }

      return updatedBoards;

    default:
      return state;
  }
}
