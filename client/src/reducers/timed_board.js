import * as types from '../actions/action_types';

const INITIAL_STATE = {
  id: '',
  title: '',
  timedIdeas: [],
  authorId: '',
  boardId: '',
  timerLength: 0,
  createdAt: '',
  completed: false,
  isLoading: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_TIMED_BOARD_REQUEST:
      return { ...state, isLoading: true };

    case types.GET_TIMED_BOARD_SUCCESS:
      return { ...action.payload, isLoading: false };

    case types.GET_TIMED_BOARD_ERROR:
      return { ...state, isLoading: false };

    case types.NEW_TIMED_IDEA:
      return { ...state, timedIdeas: [...state.timedIdeas, action.payload.data.idea] };

    case types.UPDATE_TIMED_IDEA:
      const updatedIdeas = state.timedIdeas.map(idea => {
        return idea.id === action.payload.data.idea.id ? action.payload.data.idea : idea;
      });
      return { ...state, timedIdeas: updatedIdeas };

    case types.DELETE_TIMED_IDEA:
      const filteredIdeas = state.timedIdeas.filter(idea => idea.id !== action.payload.data.idea.id);
      return { ...state, timedIdeas: filteredIdeas };

    case types.CLEAR_TIMED_BOARD_VIEW:
      return INITIAL_STATE;

    case types.SHUFFLE_TIMED_IDEAS:
      let i = 0;
      let j = 0;
      let temp = null;
      const arrayRandom = state.timedIdeas.slice();

      for (i = arrayRandom.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arrayRandom[i];
        arrayRandom[i] = arrayRandom[j];
        arrayRandom[j] = temp;
      }

      return { ...state, timedIdeas: arrayRandom };

    case types.SORT_TIMED_IDEAS_BY_CONTENT:
      const arrayByContent = state.timedIdeas.slice();
      const orderContent = action.order;

      arrayByContent.sort((a, b) => {
        const strA = a.content.toLowerCase();
        const strB = b.content.toLowerCase();
        if (orderContent === 1) { return strA > strB ? 1 : -1; }
        if (orderContent === 2) { return strA < strB ? 1 : -1; }
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      return { ...state, timedIdeas: arrayByContent };

    case types.SORT_TIMED_IDEAS_BY_TIME:
      const arrayByTime = state.timedIdeas.slice();
      const orderTime = action.order;

      arrayByTime.sort((a, b) => {
        if (orderTime === 1) { return new Date(b.createdAt) - new Date(a.createdAt); }
        if (orderTime === 0) { return new Date(a.createdAt) - new Date(b.createdAt); }
      });

      return { ...state, timedIdeas: arrayByTime };

    default:
      return state;
  }
}
