import { request } from '../utils/request';
import { checkFailed, checkToken } from './auth';
import { createAction, handleAction } from 'redux-actions';


export const getCharacters = () => {
  return (dispatch) => {
    const token = checkToken();
    if (!token) {
      dispatch(checkFailed());
    } else {
      const opts = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      console.log(opts);
      request(`http://dev.servall.xyz/api/character`, opts)
      .then((result) => {
        dispatch({ type: 'GET_CHARACTERS', payload: result, error: true });
      })
      .catch((error) => {
        dispatch({ type: 'GET_CHARACTERS', payload: error, error: true });
        dispatch(checkFailed(error));
      })
    }
  }
};


export const characters = handleAction('GET_CHARACTERS', {
  next(state, action) {
    console.log(action)
    return { ...state, characters: action.payload }
  }
}, { characters: [] })
