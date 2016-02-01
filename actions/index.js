import fetch from 'isomorphic-fetch'

export const REQUEST_HANDLERS = 'REQUEST_HANDLERS'
export const RECEIVE_HANDLERS = 'RECEIVE_HANDLERS'

function requestHandlers() {
  return {
    type: REQUEST_HANDLERS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_HANDLERS,
    handlers: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchHandlers() {
  return dispatch => {
    dispatch(requestHandlers())
    return fetch(`http://localhost:8088/api/handlers/`)
    .then(function(data){
        console.log('Data is ', data)
    })
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchHandlers(state) {
  const handlers = state.handlers
  if (!handlers) {
    return true
  }
  if (handlers.isFetching) {
    return false
  }
  return true 
}

export function fetchHandlersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchHandlers(getState())) {
      return dispatch(fetchHandlers())
    }
  }
}
