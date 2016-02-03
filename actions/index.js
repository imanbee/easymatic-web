import fetch from 'isomorphic-fetch'

export const REQUEST_HANDLERS = 'REQUEST_HANDLERS'
export const RECEIVE_HANDLERS = 'RECEIVE_HANDLERS'

function requestHandlers() {
  return {
    type: REQUEST_HANDLERS
  }
}

function receivePosts(json) {
    console.log('Receive posts ', json)
  return {
    type: RECEIVE_HANDLERS,
    items: json,
    receivedAt: Date.now()
  }
}

function fetchHandlers() {
  return dispatch => {
    dispatch(requestHandlers())
    return fetch('http://localhost:8088/api/handlers/')
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchHandlers(state) {
    console.log('State is ', state)
    console.log('Handlers is ', state.handlers.items)
  var handlers = state.handlers.items
  if (!handlers || handlers.length === 0) {
    console.log('Need to fetch')
    return true
  }
  if (handlers.isFetching) {
    return false
  }
  console.log('No need to fetch')
  return false 
}

export function fetchHandlersIfNeeded() {
  return (dispatch, getState) => {
    // if (shouldFetchHandlers(getState())) {
      return dispatch(fetchHandlers())
    // }
  }
}
