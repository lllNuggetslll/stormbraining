import axios from 'axios';
import * as types from './action_types';

const ROOT_URL = '/api';

export function newIdea(idea, id) {
  axios.post(`${ROOT_URL}/boards/${id}/ideas`, { content: idea });
  return {
    type: types.NEW_IDEA,
  };
}

export function getOneIdea(id, ideaId) {
  const request = axios.get(`${ROOT_URL}/boards/${id}/ideas/${ideaId}`);
  return {
    type: types.GET_ONE_IDEA,
    payload: request,
  };
}

export function upVote(id, ideaId) {
  axios.post(`${ROOT_URL}/boards/${id}/ideas/${ideaId}/upvotes`);
  return {
    type: types.UP_VOTE,
  };
}

export function deleteIdea(id, ideaId) {
  axios.delete(`${ROOT_URL}/boards/${id}/ideas/${ideaId}`);
  return {
    type: types.DELETE_IDEA,
  };
}

export function newBoard(title) {
  axios.post(`${ROOT_URL}/boards`, { title });
  return {
    type: types.NEW_BOARD,
  };
}

export function getBoards() {
  const request = axios.get(`${ROOT_URL}/boards`);
  return {
    type: types.GET_BOARDS,
    payload: request,
  };
}

export function getOneBoard(id) {
  const request = axios.get(`${ROOT_URL}/boards/${id}`);
  return {
    type: types.GET_ONE_BOARD,
    payload: request,
  };
}

export function deleteBoard(id) {
  axios.delete(`${ROOT_URL}/boards/${id}`);
  return {
    type: types.DELETE_BOARD,
  };
}

export function refreshBoardView(changedEntry) {
  return {
    type: types.REFRESH_BOARD_VIEW,
    payload: changedEntry,
  };
}

export function clearBoardView() {
  return {
    type: types.CLEAR_BOARD_VIEW,
  };
}

export function refreshAllBoards(changedEntry) {
  return {
    type: types.REFRESH_ALL_BOARDS,
    payload: changedEntry,
  };
}
