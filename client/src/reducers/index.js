import { combineReducers } from 'redux';
import BoardReducer from './board';
import AllBoardsReducer from './all_boards';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  board: BoardReducer,
  allBoards: AllBoardsReducer,
  auth: AuthReducer,
});

export default rootReducer;
