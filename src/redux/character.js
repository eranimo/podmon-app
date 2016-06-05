import { getCharacterInfo } from '../api/user'
import { makeActionCreators } from '../utils/makeActionCreators'
import { makeReducer } from '../utils/makeReducer'

const noun = 'character'
export const fetchCharacter = makeActionCreators(noun, (accountId, charId) => getCharacterInfo(accountId, charId))
export const character = makeReducer(noun)
