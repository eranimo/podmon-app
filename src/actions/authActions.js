import cookie from 'react-cookie';
import { replace } from 'react-router-redux'

import { post } from '../utils/request'

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
  return { type: LOGIN_SUCCESS, data: { token, user } }
}

function loginFailure(error) {
  return { type: LOGIN_FAILURE, data: { error } }
}

function checkSuccess(token, user) {
  return { type: CHECK_SUCCESS, data: { token, user } }
}

function checkFailed(error) {
  cookie.remove(AUTH_COOKIE_NAME)
  return { type: CHECK_FAILED, data: { error } }
}

// action creators

export function login(username, password) {
  return (dispatch) => {
    post(dispatch, '/api/token/fetch', { username, password })
      .then(({ token, user, orig_iat }) => {
        cookie.save(AUTH_COOKIE_NAME, JSON.stringify({token, orig_iat}))
        dispatch(loginSuccess(token, user))
        dispatch(replace('/main'))
      })
      .catch((error) => dispatch(loginFailure(error)))
  }
}

export function checkLogin() {
  return (dispatch) => {
    const authToken = cookie.load(AUTH_COOKIE_NAME)
    if (authToken) {
      post(dispatch, '/api/token/refresh', authToken)
        .then(({ token, user }) => {
          cookie.save('authToken', token)
          dispatch(checkSuccess(token, user))
        })
        .catch((error) => {
          // auth token probably expired, redurect to login page
          dispatch(checkFailed(error))
          dispatch(replace('/login'))
        })
    } else {
      // no auth token, redirect to login page
      dispatch(checkFailed())
      dispatch(replace('/login'))
    }
  }
}

export function logout() {
  cookie.remove(AUTH_COOKIE_NAME)
  return { type: LOGOUT }
}
