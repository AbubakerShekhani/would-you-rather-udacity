import { combineReducers } from 'redux'
import users from './users'
import authentication from './authentication'
import questions from './questions'

export default combineReducers({users, authentication, questions})