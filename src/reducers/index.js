import { combineReducers } from 'redux'

import counter from './counter'
import authReducer from './auth'

export default {
  counter,
  auth: authReducer
}
