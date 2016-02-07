import fetch from 'isomorphic-fetch'

export const REQUEST_HANDLERS = 'REQUEST_HANDLERS'
export const RECEIVE_HANDLERS = 'RECEIVE_HANDLERS'
export const SELECT_HANDLER = 'SELECT_HANDLER'
export const REQUEST_TAGS = 'REQUEST_TAGS'
export const RECEIVE_TAGS = 'RECEIVE_TAGS'

function requestHandlers() {
    return {
        type: REQUEST_HANDLERS
    }
}

function receiveHandlers(json) {
    return {
        type: RECEIVE_HANDLERS,
        items: json,
        receivedAt: Date.now()
    }
}

function selectHandler(handler) {
    return {
        type: SELECT_HANDLER,
        handler
    }
}

function requestTags(handler) {
    return {
        type: REQUEST_TAGS,
        handler
    }
}

function receiveTags(handler, json) {
    console.log('Receive tags ', json)
    var tags = [];
    for (var i in json) {
        console.log('Tag ', i, json[i]);
        var tag = {
            name: i,
            value: json[i]
        }
        tags.push(tag)
    }
    
    console.log('Transform to tags array', tags)
    return {
        type: RECEIVE_TAGS,
        handler,
        items: tags,
        receivedAt: Date.now()
    }
}

export function fetchHandlers() {
    return dispatch => {
        dispatch(requestHandlers())
            return fetch('http://localhost:8088/api/handlers/')
            .then(response => response.json())
            .then(json => dispatch(receiveHandlers(json)))
    }
}

function fetchTags(handler) {
    return dispatch => {
        dispatch(requestTags(handler))
        return fetch(`http://localhost:8088/api/handlers/${handler}/tags/`)
            .then(response => response.json())
            .then(json => dispatch(receiveTags(handler, json)))
    }
}

function shouldFetchTags(state, handler) {
    const tags = state.tagsByHandler[handler]
    if (!tags) {
        return true
    }
    if (tags.isFetching) {
        return false
    }
    return true 
}

export function fetchTagsIfNeeded(handler) {
    return (dispatch, getState) => {
        if (shouldFetchTags(getState(), handler)) {
            return dispatch(fetchTags(handler))
        }
    }
}
