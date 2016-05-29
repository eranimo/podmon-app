import { getAccount } from '../api/user'
import { makeActionCreators } from '../utils/makeActionCreators'
import { makeReducer } from '../utils/makeReducer'

const noun = 'account'
export const fetchAccount = makeActionCreators(noun, (x) => getAccount(x))
export const account = makeReducer(noun)
