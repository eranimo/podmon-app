import { getAccounts } from '../api/user'
import { makeActionCreators } from '../utils/makeActionCreators'
import { makeReducer } from '../utils/makeReducer'

const noun = 'accounts'
export const fetchAccounts = makeActionCreators(noun, (x) => getAccounts(x))
export const accounts = makeReducer(noun)
