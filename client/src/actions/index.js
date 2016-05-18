import axios from 'axios';
import * as types from './action_types';
import { lockError } from './auth_actions';

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

export function unVote(id, ideaId) {
  const request = axios.put(`${ROOT_URL}/boards/${id}/ideas/${ideaId}/upvotes`);
  return {
    type: types.UN_VOTE,
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

export function branchIdeaToBoard(title) {
  const request = axios.post(`${ROOT_URL}/boards`, { title });
  return {
    type: types.BRANCH_IDEA_TO_BOARD,
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
  return dispatch => {
    dispatch(getOneBoardRequest());
    return axios.get(`${ROOT_URL}/boards/${id}`)
      .then(res => {
        setTimeout(() => dispatch(getOneBoardSuccess(res.data)), 500);
      })
      .catch(err => {
        if (err.status === 401) {
          dispatch(lockError(err));
        } else {
          dispatch(getOneBoardError(err));
        }
      });
  };
}

export function getOneBoardRequest() {
  return {
    type: types.GET_ONE_BOARD_REQUEST,
  };
}

export function getOneBoardSuccess({ board }) {
  return {
    type: types.GET_ONE_BOARD_SUCCESS,
    payload: board,
  };
}

export function getOneBoardError(err) {
  return {
    type: types.GET_ONE_BOARD_ERROR,
    err,
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

export function saveOrFetchUser(user) {
  const request = axios.post(`${ROOT_URL}/users`, { user });
  return {
    type: types.SAVE_OR_FETCH_USER,
    payload: request,
  };
}

export function shuffleIdeas() {
  return {
    type: types.SHUFFLE_IDEAS,
  };
}

export function sortIdeasByVotes(order) {
  return {
    type: types.SORT_IDEAS_BY_VOTES,
    order,
  };
}

export function sortIdeasByContent(order) {
  return {
    type: types.SORT_IDEAS_BY_CONTENT,
    order,
  };
}

export function sortIdeasByTime(order) {
  return {
    type: types.SORT_IDEAS_BY_TIME,
    order,
  };
}

export function addComment(content, userName, ideaId, boardId) {
  const request = axios.post(`${ROOT_URL}/boards/${boardId}/ideas/${ideaId}/comments`, { content, userName });
  return {
    type: types.ADD_COMMENT,
    payload: request,
  };
}

export function deleteComment(commentId, ideaId, boardId) {
  const request = axios.delete(`${ROOT_URL}/boards/${boardId}/ideas/${ideaId}/comments/${commentId}`);
  return {
    type: types.DELETE_COMMENT,
    payload: request,
  };
}

export function syncComment(comment) {
  return {
    type: types.SYNC_COMMENT,
    comment,
  };
}

export function getMessages(boardId) {
  const request = axios.get(`${ROOT_URL}/messages/${boardId}`);
  return {
    type: types.GET_MESSAGES,
    payload: request,
  };
}

export function addMessage(boardId, message, userName) {
  const request = axios.post(`${ROOT_URL}/messages/${boardId}`, { message, userName });
  return {
    type: types.ADD_MESSAGE,
    payload: request,
  };
}

export function getActiveUsers(boardId) {
  const request = axios.get(`${ROOT_URL}/activeusers/${boardId}`);
  return {
    type: types.GET_ACTIVEUSER,
    payload: request,
  };
}

export function addActiveUser(boardId, name) {
  const request = axios.post(`${ROOT_URL}/activeusers/${boardId}`, { boardId, name });
  return {
    type: types.ADD_ACTIVEUSER,
    payload: request,
  };
}

export function deleteActiveUser(boardId) {
  const request = axios.delete(`${ROOT_URL}/activeusers/${boardId}`);
  return {
    type: types.DELETE_ACTIVEUSER,
    payload: request,
  };
}

export function getUser() {
  return dispatch => {
    dispatch(getUserRequest());
    return axios.get(`${ROOT_URL}/users`)
      .then(res => {
        setTimeout(() => dispatch(getUserSuccess(res.data)), 500);
      })
      .catch(err => {
        if (err.status === 401) {
          dispatch(lockError(err));
        } else {
          dispatch(getUserError(err));
        }
      });
  };
}

export function getUserRequest() {
  return {
    type: types.GET_USER_REQUEST,
  };
}

export function getUserSuccess({ user }) {
  return {
    type: types.GET_USER_SUCCESS,
    payload: user,
  };
}

export function getUserError(err) {
  return {
    type: types.GET_USER_ERROR,
    err,
  };
}

export function joinBoard(boardId) {
  const request = axios.post(`${ROOT_URL}/users/${boardId}`);
  return {
    type: types.JOIN_BOARD,
    payload: request,
  };
}

export function leaveBoard(boardId) {
  const request = axios.put(`${ROOT_URL}/users/${boardId}`);
  return {
    type: types.LEAVE_BOARD,
    payload: request,
  };
}

export function sendEmail(email, title, name, link) {
  const request = axios.post(`${ROOT_URL}/boards/email`, { email, title, name, link });
  return {
    type: types.SEND_EMAIL,
    payload: request,
  };
}
