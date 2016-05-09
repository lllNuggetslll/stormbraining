import { combineReducers } from 'redux';
import BoardReducer from './board';
import AllBoardsReducer from './all_boards';
import AuthReducer from './auth';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  board: BoardReducer,
  allBoards: AllBoardsReducer,
  auth: AuthReducer,
  routing: routerReducer,
});

export default rootReducer;
