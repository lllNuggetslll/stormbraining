import { combineReducers } from 'redux';
import BoardReducer from './board';
import AllBoardsReducer from './all_boards';
import AuthReducer from './auth';
import { routerReducer } from 'react-router-redux';
import ChatReducer from './chat';
import ActiveUserReducer from './activeuser';

const rootReducer = combineReducers({
  board: BoardReducer,
  allBoards: AllBoardsReducer,
  auth: AuthReducer,
  routing: routerReducer,
  chat: ChatReducer,
  activeuser: ActiveUserReducer,
});

export default rootReducer;
