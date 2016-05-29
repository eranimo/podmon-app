import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_SUCCESS,
  CHECK_FAILED,
  LOGOUT
} from '../actions/authActions'

const initialState = {
  loggingIn: false,
  hasError: false,
  loginError: null,
  user: null
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case CHECK_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        hasError: false,
        user: action.data.user
      }
    case CHECK_FAILED:
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        hasError: true,
        loginError: action.data.error
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
