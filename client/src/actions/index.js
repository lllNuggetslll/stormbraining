import axios from 'axios';
import * as types from './action_types';

// Attaches Authentication token to outgoing API requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('id_token') || null;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const ROOT_URL = '/api';

export function newIdea(idea, id) {
  const request = axios.post(`${ROOT_URL}/boards/${id}/ideas`, { content: idea });
  return {
    type: types.NEW_IDEA,
    payload: request,
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
  const request = axios.post(`${ROOT_URL}/boards/${id}/ideas/${ideaId}/upvotes`);
  return {
    type: types.UP_VOTE,
    payload: request,
  };
}

export function deleteIdea(id, ideaId) {
  const request = axios.delete(`${ROOT_URL}/boards/${id}/ideas/${ideaId}`);
  return {
    type: types.DELETE_IDEA,
    payload: request,
  };
}

export function updateIdea(idea, id, ideaId) {
  const request = axios.put(`${ROOT_URL}/boards/${id}/ideas/${ideaId}`, { content: idea });
  return {
    type: types.UPDATE_IDEA,
    payload: request,
  };
}

export function newBoard(title) {
  const request = axios.post(`${ROOT_URL}/boards`, { title });
  return {
    type: types.NEW_BOARD,
    payload: request,
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
  const request = axios.delete(`${ROOT_URL}/boards/${id}`);
  return {
    type: types.DELETE_BOARD,
    payload: request,
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
