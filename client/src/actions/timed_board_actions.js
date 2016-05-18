import axios from 'axios';
import * as types from './action_types';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('id_token') || null;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const ROOT_URL = '/api';

export function newTimedIdea(idea, id) {
  const request = axios.post(`${ROOT_URL}/timed/${id}`, { content: idea });
  return {
    type: types.NEW_TIMED_IDEA,
    payload: request,
  };
}

export function deleteTimedIdea(id, ideaId) {
  const request = axios.delete(`${ROOT_URL}/timed/${id}/${ideaId}`);
  return {
    type: types.DELETE_TIMED_IDEA,
    payload: request,
  };
}

export function toggleTimedIdea(id, ideaId) {
  const request = axios.post(`${ROOT_URL}/timed/${id}/${ideaId}`);
  return {
    type: types.UPDATE_TIMED_IDEA,
    payload: request,
  };
}

export function updateTimedIdea(idea, id, ideaId) {
  const request = axios.put(`${ROOT_URL}/timed/${id}/${ideaId}`, { content: idea });
  return {
    type: types.UPDATE_TIMED_IDEA,
    payload: request,
  };
}

export function newTimedBoard(title, timerLength, id) {
  const request = axios.post(`${ROOT_URL}/boards/${id}/timed`, { title, timerLength });
  return {
    type: types.NEW_TIMED_BOARD,
    payload: request,
  };
}

export function pushTimedBoard(id) {
  const request = axios.put(`${ROOT_URL}/timed/${id}`);
  return {
    type: types.PUSH_TIMED_BOARD,
    payload: request,
  };
}

export function getTimedBoard(id) {
  return dispatch => {
    dispatch(getTimedBoardRequest());
    return axios.get(`${ROOT_URL}/timed/${id}`)
      .then(res => {
        setTimeout(() => dispatch(getTimedBoardSuccess(res.data)), 500);
      })
      .catch(err => {
        if (err.status === 401) {
          dispatch(lockError(err));
        } else {
          dispatch(getTimedBoardError(err));
        }
      });
  };
}

export function getTimedBoardRequest() {
  return {
    type: types.GET_TIMED_BOARD_REQUEST,
  };
}

export function getTimedBoardSuccess({ board }) {
  return {
    type: types.GET_TIMED_BOARD_SUCCESS,
    payload: board,
  };
}

export function getTimedBoardError(err) {
  return {
    type: types.GET_TIMED_BOARD_ERROR,
    err,
  };
}

export function clearTimedBoardView() {
  return {
    type: types.CLEAR_TIMED_BOARD_VIEW,
  };
}

export function shuffleTimedIdeas() {
  return {
    type: types.SHUFFLE_TIMED_IDEAS,
  };
}

export function sortTimedIdeasByContent(order) {
  return {
    type: types.SORT_TIMED_IDEAS_BY_CONTENT,
    order,
  };
}

export function sortTimedIdeasByTime(order) {
  return {
    type: types.SORT_TIMED_IDEAS_BY_TIME,
    order,
  };
}