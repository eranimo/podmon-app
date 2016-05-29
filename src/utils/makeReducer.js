export function makeReducer(actionName) {
  const initialState ={
    hasError: false,
    [actionName]: null
  }
  return (state = initialState, action) => {
    console.log(action.type, 'FETCH_' + actionName.toUpperCase())
    if (action.type === 'FETCH_' + actionName.toUpperCase() + '_SUCCESS'){
      return {
        ...state,
        hasError: false,
        [actionName]: action.data[actionName]
      }
    } else if ('FETCH_' + actionName.toUpperCase() + '_FAILED') {
      return {
        ...state,
        hasError: true,
        [actionName]: null
      }
    } else {
      return state
    }
  }
}
