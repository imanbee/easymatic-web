import { combineReducers } from 'redux'
import {
  REQUEST_HANDLERS, RECEIVE_HANDLERS, SELECT_HANDLER, REQUEST_TAGS, RECEIVE_TAGS
} from '../actions'

function selectedHandler(state = '', action) {
    switch (action.type) {
    case SELECT_HANDLER:
        return action.handler
    default:
        return state
    }
}

function tags(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
    case REQUEST_TAGS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_TAGS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
    }
}

function tagsByHandler(state = {}, action) {
    switch (action.type) {
        case REQUEST_TAGS:
        case RECEIVE_TAGS:
            return Object.assign({}, state, {
                [action.handler]: tags(state[action.handler], action)
            })
        default:
            return state
    }
}

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
    tagsByHandler,
    selectedHandler,
    handlers
})

export default rootReducer
