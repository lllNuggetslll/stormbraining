import expect from 'expect';
import reducer from '../../reducers/all_boards.js';
import * as types from '../../actions/action_types';

describe('all_boards reducer', () => {
  const existingBoard = {
    id: 1,
    ideas: [],
    title: 'Different Board',
    createdAt: new Date(),
  };
  const boards = [existingBoard];

  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual([]);
  });

  it('should handle NEW_BOARD', () => {
    expect(reducer(boards, {
      type: types.NEW_BOARD,
    }))
      .toEqual([existingBoard]);
  });

  it('should handle GET_BOARDS', () => {
    expect(reducer(undefined, {
      type: types.GET_BOARDS,
      payload: { data: { boards } },
    }))
      .toEqual(boards);
  });
});
