import { combineReducers } from 'redux'
import {
  REQUEST_HANDLERS, RECEIVE_HANDLERS, SELECT_HANDLER, REQUEST_TAGS, RECEIVE_TAGS, REQUEST_EVENTS, RECEIVE_EVENT, SEND_TAG_SUCCESS
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
    case SEND_TAG_SUCCESS:
    var tags = state.items
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i]
      if (tag.name === action.tag) {
        tag.value = action.value
      }
    }
    return Object.assign({}, state, {
      isFetching: false,
      items: tags,
      lastUpdated: action.receivedAt
    })
    case RECEIVE_EVENT:
      for (var j in action.payload) {
        if (action.payload.hasOwnProperty(j)) {
          var event = action.payload[j]
          var tagName = event.tag
          var tagValue = event.value
          console.log('test:', tagName, tagValue)
          let tagsItems = state.items
          for (let k = 0; k < tagsItems.length; k++) {
            var tagItem = tagsItems[k]
            if (tagItem.name === tagName) {
              tagItem.value = tagValue;
            }
          }
          return Object.assign({}, state, {
            isFetching: false,
            items: tagsItems,
            lastUpdated: action.receivedAt
          })
        }
      }
      break
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
    case SEND_TAG_SUCCESS:
    return Object.assign({}, state, {
      [action.handler]: tags(state[action.handler], action)
    })
    case RECEIVE_EVENT:
    var handler
    for (var i in action.payload) {
      if (action.payload.hasOwnProperty(i)) {
        handler = action.payload[i].handler
      }
    }
    if (handler) {
      return Object.assign({}, state, {
        [handler]: tags(state[handler], action)
      })
    } else {
      return state
    }
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

function events(state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case REQUEST_EVENTS:
    return Object.assign({}, state, {
      isFetching: true
    })
    case RECEIVE_EVENT:
    return Object.assign({}, state, {
      isFetching: false,
      data: [...state.data, action.payload]
    })
    default:
    return state
  }
}

const rootReducer = combineReducers({
  tagsByHandler,
  selectedHandler,
  handlers,
  events
})

export default rootReducer
