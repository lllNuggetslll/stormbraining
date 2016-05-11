import {
  NEW_IDEA,
  GET_ONE_BOARD,
  UP_VOTE,
  DELETE_IDEA,
  CLEAR_BOARD_VIEW,
  REFRESH_BOARD_VIEW,
  SHUFFLE_IDEAS,
  SORT_IDEAS_BY_VOTES,
  SORT_IDEAS_BY_CONTENT,
  SYNC_COMMENT,
} from '../actions/action_types';

const INITIAL_STATE = { id: '', title: '', ideas: [], messages: [] };

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
      let changedIdea = action.payload;
      let updateComplete = false;
      // Update idea based on whether or not it is marked toBeDeleted and by matching ids
      const updatedIdeas = state.ideas.reduce((memo, idea) => {
        if (idea.id === changedIdea.id) {
          if (!changedIdea.toBeDeleted) {
            const update = Object.assign(idea, changedIdea);
            memo.push(update);
          }
          updateComplete = true;
        } else {
          memo.push(idea);
        }
        return memo;
      }, []);
      // Add new idea if changedIdea id did not matching existing ids
      if (!updateComplete && !changedIdea.toBeDeleted) {
        changedIdea = Object.assign(changedIdea, { comments: [] });
        updatedIdeas.push(changedIdea);
      }
      return { ...state, ideas: updatedIdeas };

    case SHUFFLE_IDEAS:
      let i = 0;
      let j = 0;
      let temp = null;
      const arrayRandom = state.ideas.slice();

      for (i = arrayRandom.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arrayRandom[i];
        arrayRandom[i] = arrayRandom[j];
        arrayRandom[j] = temp;
      }

      return { ...state, ideas: arrayRandom };

    case SORT_IDEAS_BY_VOTES:
      const arrayByVotes = state.ideas.slice();
      const orderVotes = action.order;

      arrayByVotes.sort((a, b) => {
        if (orderVotes === 1) { return b.upvotes.length - a.upvotes.length; }
        if (orderVotes === 2) { return a.upvotes.length - b.upvotes.length; }
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      return { ...state, ideas: arrayByVotes };

    case SORT_IDEAS_BY_CONTENT:
      const arrayByContent = state.ideas.slice();
      const orderContent = action.order;

      arrayByContent.sort((a, b) => {
        const strA = a.content.toLowerCase();
        const strB = b.content.toLowerCase();
        if (orderContent === 1) { return strA > strB ? 1 : -1; }
        if (orderContent === 2) { return strA < strB ? 1 : -1; }
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      return { ...state, ideas: arrayByContent };

    case SYNC_COMMENT:
      const changedIdeas = state.ideas.slice();
      changedIdeas.forEach(idea => {
        if (idea.id === action.comment.ideaId) {
          idea.comments = idea.comments.reduce((memo, comment) => {
            if (comment.id === action.comment.id && action.comment.toBeDeleted) {
              return memo;
            }
            memo.push(comment);
            return memo;
          }, []);
          if (!action.comment.toBeDeleted) {idea.comments.push(action.comment);}
        }
      });
      return { ...state, ideas: changedIdeas };

    default:
      return state;
  }
}
