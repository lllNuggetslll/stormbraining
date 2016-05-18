import { combineReducers } from 'redux';
import BoardReducer from './board';
import TimedBoardReducer from './timed_board';
import AllBoardsReducer from './all_boards';
import AuthReducer from './auth';
import { routerReducer } from 'react-router-redux';
import ChatReducer from './chat';
import ActiveUserReducer from './activeuser';
import UserReducer from './user';

const rootReducer = combineReducers({
  board: BoardReducer,
  timedBoard: TimedBoardReducer,
  allBoards: AllBoardsReducer,
  auth: AuthReducer,
  routing: routerReducer,
  chat: ChatReducer,
  activeuser: ActiveUserReducer,
  user: UserReducer,
});

export default rootReducer;
