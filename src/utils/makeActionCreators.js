export function makeActionCreators(noun, func) {
  const base = 'FETCH_' + noun.toUpperCase()
  return (...params) => {
    return (dispatch) => {
      dispatch({ type: base })
      func(...params)
        .then((param) => dispatch({ type: base + '_SUCCESS', data: { [noun]: param }}))
        .catch((error) => {
          console.error(error)
          dispatch({ type: base + '_FAILED', data: { error: error }})
        })
    }
  }
}
