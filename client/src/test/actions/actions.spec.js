import expect from 'expect';
import nock from 'nock';
import * as actions from '../../actions/index.js';
import * as types from '../../actions/action_types';

const ROOT_URL = '/api';

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const board = {
    id: 1,
    title: 'Board 1',
    ideas: [
      {
        id: 1,
        content: 'This is an existing idea!',
        upvotes: 4,
        boardId: 1,
        createdAt: new Date(),
      },
      {
        id: 2,
        content: 'This is another idea!',
        upvotes: 10,
        boardId: 2,
        createdAt: new Date(),
      },
    ],
  };

  const boards = [
    board,
    { id: 2, title: 'Board 2', ideas: [] },
    { id: 3, title: 'Board 3', ideas: [] },
  ];

  it('should create action GET_BOARDS when finished retrieving boards', () => {
    nock(ROOT_URL)
      .get('/boards')
      .reply(200, { data: { boards } });

    const expectedAction = {
      type: types.GET_BOARDS,
      payload: { data: { boards } },
    };
    const getBoardsAction = actions.getBoards();

    expect(getBoardsAction.type).toEqual(expectedAction.type);
    getBoardsAction.payload.then(payload => {
      expect(payload).toEqual(expectedAction.payload);
    });
  });

  it('should create action GET_ONE_BOARD_SUCCESS when finished retrieving a board', () => {
    const expectedAction = {
      type: types.GET_ONE_BOARD_SUCCESS,
      payload: board,
    };
    const getOneBoardAction = actions.getOneBoardSuccess({ board });

    expect(getOneBoardAction.type).toEqual(expectedAction.type);
    expect(getOneBoardAction.payload).toEqual(expectedAction.payload);
  });

  it('should create action NEW_BOARD when finished creating new board', () => {
    const newBoard = { id: 4, title: 'Board 4', ideas: [] };
    nock(ROOT_URL)
      .post('/boards', { title: newBoard.title })
      .reply(201, { data: { board: newBoard } });

    const expectedAction = {
      type: types.NEW_BOARD,
      payload: { data: { board: newBoard } },
    };
    const newBoardAction = actions.newBoard(newBoard.title);

    expect(newBoardAction.type).toEqual(expectedAction.type);
    newBoardAction.payload.then(payload => {
      expect(payload).toEqual(expectedAction.payload);
    });
  });

  it('should create action GET_ONE_IDEA when finished retrieving an idea', () => {
    const idea = {
      id: 3,
      content: 'This is an idea!',
      upvotes: 6,
      boardId: 4,
      createdAt: new Date(),
    };
    const id = 13;

    nock(ROOT_URL)
      .get(`/boards/${id}/ideas/${idea.id}`)
      .reply(200, { data: { idea } });

    const expectedAction = {
      type: types.GET_ONE_IDEA,
      payload: { data: { idea } },
    };
    const getOneIdeaAction = actions.getOneIdea(id, idea.id);

    expect(getOneIdeaAction.type).toEqual(expectedAction.type);
    getOneIdeaAction.payload.then(payload => {
      expect(payload).toEqual(expectedAction.payload);
    });
  });

  it('should create action NEW_IDEA when finished creating new idea', () => {
    const newIdea = {
      id: 3,
      content: 'This is a new idea!',
      upvotes: 0,
      boardId: 1,
      createdAt: new Date(),
    };
    const boardId = 1;

    nock(ROOT_URL)
      .post(`/boards/${boardId}`, { content: newIdea.content })
      .reply(201, { data: { idea: newIdea } });

    const expectedAction = {
      type: types.NEW_IDEA,
      payload: { data: { idea: newIdea } },
    };
    const newIdeaAction = actions.newIdea(newIdea.content, boardId);

    expect(newIdeaAction.type).toEqual(expectedAction.type);
    newIdeaAction.payload.then(payload => {
      expect(payload).toEqual(expectedAction.payload);
    });
  });

  it('should create action UP_VOTE when finished upvoting an idea', () => {
    const upvotedIdea = Object.assign({}, board.ideas[0]);
    upvotedIdea.upvotes++;
    const boardId = 1;

    nock(ROOT_URL)
      .post(`/boards/${boardId}/ideas/${upvotedIdea.id}/upvotes`)
      .reply(200, { data: { upvotedIdea } });

    const expectedAction = {
      type: types.UP_VOTE,
      payload: { data: { idea: upvotedIdea } },
    };
    const upVoteAction = actions.upVote(boardId, upvotedIdea.id);

    expect(upVoteAction.type).toEqual(expectedAction.type);
    upVoteAction.payload.then(payload => {
      expect(payload).toEqual(expectedAction.payload);
    });
  });
});
