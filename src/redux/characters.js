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
        // mode: 'no-cors',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      console.log(opts);
      request('/api/character/', opts)
        .then((result) => dispatch({ type: 'GET_CHARACTERS', payload: result, error: true }))
        .catch((error) => {
          console.error(error);
          dispatch(checkFailed(error));
          dispatch({ type: 'GET_CHARACTERS', payload: error, error: true });
        })
    }
  }
};


export function characters(state = { characters: [] }, action) {
  switch (action.type) {
    case 'GET_CHARACTERS':
      return { ...state, characters: action.payload};
    default:
      return state;
  }
}
