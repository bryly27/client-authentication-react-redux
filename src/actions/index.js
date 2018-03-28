import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
  AUTH_USER, 
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://jsonplaceholder.typicode.com';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/users`, { email, password })
      .then(response => {

        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', '12345678');

        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/user`, { email, password })
      .then(response => {

        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', '123456');

        browserHistory.push('/feature');

      })
      .catch(() => {
        dispatch(authError('Bad Signup Data'))
      })
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: action.payload.data.message
        });
      })
  }
}