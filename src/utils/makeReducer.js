export function makeReducer(actionName) {
  const initialState ={
    hasError: false,
    [actionName]: null
  }
  return (state = initialState, action) => {
    if (action.type === 'FETCH_' + actionName.toUpperCase() + '_SUCCESS'){
      return {
        ...state,
        hasError: false,
        [actionName]: action.data[actionName]
      }
    } else if (action.type === 'FETCH_' + actionName.toUpperCase() + '_FAILED') {
      return {
        ...state,
        hasError: true,
        error: action.data.error,
        [actionName]: null
      }
    } else {
      return state
    }
  }
}
