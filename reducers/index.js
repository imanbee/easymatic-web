import { combineReducers } from 'redux'
import {
  REQUEST_HANDLERS, RECEIVE_HANDLERS
} from '../actions'

function handlers(state = {isFetching: false, items: []}, action) {
  console.log('State is', state)
  console.log('Action is', action)
  switch (action.type) {
    case REQUEST_HANDLERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_HANDLERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
    handlers
})

export default rootReducer
