import cookie from 'react-cookie';
import { replace } from 'react-router-redux'
import jwtDecode from 'jwt-decode'
import { request } from '../utils/request'

// constants

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const CHECK_FAILED = 'CHECK_FAILED'
export const CHECK_SUCCESS = 'CHECK_SUCCESS'

export const AUTH_COOKIE_NAME = 'authPayload'


// actions

function loginSuccess(token, user) {
  return { type: LOGIN_SUCCESS, payload: { token, user } }
}

function loginFailure(error) {
  return { type: LOGIN_FAILURE, payload: { error } }
}

export function checkFailed(error) {
  cookie.remove(AUTH_COOKIE_NAME)
  return { type: CHECK_FAILED, payload: { error } }
}

export function checkToken() {
  const cookieToken = cookie.load(AUTH_COOKIE_NAME);
  return cookieToken || false;
}

export function checkAuth() {
  return (dispatch) => {
    const token = checkToken();
    if (!token){
      dispatch(replace('/login'))
      dispatch(checkFailed());
    } else {
      let decoded = jwtDecode(token);
      dispatch(loginSuccess(token, { username: decoded.username }))
    }
  }
}

// action creators

export function login(username, password) {
  return (dispatch) => {
    request('/api/login_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json'
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then((result) => {
      const { token, data } = result
      console.log(token, data);
      cookie.save(AUTH_COOKIE_NAME, JSON.stringify(token));
      dispatch(loginSuccess(token, data));
      dispatch(replace('/accounts'));
    })
    .catch((error) => {
      dispatch(loginFailure(error));
    });
  }
}

export function logout() {
  cookie.remove(AUTH_COOKIE_NAME)
  return { type: LOGOUT }
}


const initialState = {
  loggingIn: false,
  hasError: false,
  loginError: null,
  user: null
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        hasError: false,
        user: action.payload.user
      }
    case CHECK_FAILED:
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        hasError: true,
        loginError: action.payload.error
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
