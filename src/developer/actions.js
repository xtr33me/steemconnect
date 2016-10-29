// import _ from 'lodash';
// import steem from 'steem';
// import PermissionList from '../../lib/permissions';

export const CREATE_APP_REQUEST = '@developer/CREATE_APP_REQUEST';
export const CREATE_APP_SUCCESS = '@developer/CREATE_APP_SUCCESS';
export const CREATE_APP_FAILURE = '@developer/CREATE_APP_FAILURE';
export const GET_APP_REQUEST = '@developer/GET_APP_REQUEST';
export const GET_APP_SUCCESS = '@developer/GET_APP_SUCCESS';
export const GET_APP_FAILURE = '@developer/GET_APP_FAILURE';

export function createApp(appData) {
  return (dispatch) => {
    dispatch({ type: CREATE_APP_REQUEST });
    fetch('/auth/app', {
      method: 'POST',
      body: JSON.stringify(appData),
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-csrf-token': document.querySelector('meta[name="_csrf"]').content,
      }),
    })
      .then(response => response.json())
      .then(app => dispatch({ type: CREATE_APP_SUCCESS, app }))
      .catch((err) => {
        const errorMessage = typeof err !== 'string' ? ((err.data && err.data.error) || err.statusText) : err;
        dispatch({
          type: CREATE_APP_FAILURE,
          app: {},
          errorMessage,
        });
      });
  };
}

export function getApp(appUserName) {
  return (dispatch) => {
    dispatch({ type: GET_APP_REQUEST });
    fetch(`/auth/app/@${appUserName}`, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-csrf-token': document.querySelector('meta[name="_csrf"]').content,
      }),
    })
      .then(response => response.json())
      .then(app => dispatch({ type: GET_APP_SUCCESS, app }))
      .catch((err) => {
        const errorMessage = typeof err !== 'string' ? ((err.data && err.data.error) || err.statusText) : err;
        dispatch({
          type: GET_APP_FAILURE,
          app: {},
          errorMessage,
        });
      });
  };
}