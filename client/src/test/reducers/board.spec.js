import expect from 'expect';
import reducer from '../../reducers/board.js';
import * as types from '../../actions/action_types';

describe('board reducer', () => {
  const existingIdea = {
    id: 0,
    content: 'This is an existing idea!',
    upvotes: 4,
    boardId: 1,
    createdAt: new Date(),
  };
  const newIdea = {
    id: 1,
    content: 'This is a new idea!',
    upvotes: 0,
    boardId: 1,
    createdAt: new Date(),
  };
  const state = { title: 'Board Title', ideas: [existingIdea] };

  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        id: '',
        title: '',
        ideas: [],
      });
  });

  it('should handle NEW_IDEA', () => {
    expect(reducer(state, {
      type: types.NEW_IDEA,
    }))
      .toEqual({
        title: 'Board Title',
        ideas: [existingIdea],
      });
  });

  it('should handle GET_ONE_BOARD', () => {
    const anotherIdea = {
      id: 2,
      content: 'This is another idea!',
      upvotes: 10,
      boardId: 2,
      createdAt: new Date(),
    };
    const board = {
      id: 1,
      ideas: [anotherIdea],
      title: 'Different Board',
      createdAt: new Date(),
    };

    expect(reducer(state, {
      type: types.GET_ONE_BOARD,
      payload: { data: { board } },
    }))
      .toEqual({ ...board });
  });

  it('should handle UP_VOTE', () => {
    const newState = { title: 'My Board', ideas: [existingIdea, newIdea] };

    expect(reducer(newState, {
      type: types.UP_VOTE,
    }))
      .toEqual({
        title: 'My Board',
        ideas: [existingIdea, newIdea],
      });
  });
});
