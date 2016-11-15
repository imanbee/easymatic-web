import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import { fetchHandlers } from '../../actions'
import HandlersList from '../../components/HandlersList'
import TagsList from '../../components/TagsList'
import EventsMonitor from '../../containers/EventsMonitor'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchHandlers())
  }

  handleChange(nextHandler) {
    this.props.dispatch()
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(fetchHandlers())
  }

  render() {
    const { handlers, selectedHandler, isFetching, events } = this.props
    console.log('Selected handler is ', selectedHandler)
    var handlersTagsContainerStyle = {
      height: '60vh'
    }
    return (
      <Grid>
        {isFetching && handlers.length === 0 &&
            <h2>Loading...</h2>
        }
        {!isFetching && handlers.length === 0 &&
            <h2>Empty.</h2>
        }
        {handlers.length > 0 &&
            <Row top="xs" style={handlersTagsContainerStyle}>
              <Col xs={3} md={3} style={{maxHeight: '100%', overflowY: 'scroll'}}>
                <HandlersList handlers={handlers} />
              </Col>
              <Col xsOffset={1} xs={8} mdOffset={1} md={8} style={{maxHeight: '100%', overflowY: 'scroll'}}>
                {selectedHandler && selectedHandler.tags && selectedHandler.tags.items && selectedHandler.tags.items.length > 0 &&
                    <TagsList tags={selectedHandler.tags.items} handler={selectedHandler} />
                }
              </Col>
            </Row>
        }
        <Row>
          <EventsMonitor events={events}/>
        </Row>
      </Grid>
    )
  }
}

App.propTypes = {
  handlers: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  console.log('Map state to props', state)
  let selectedHandlerName = state.selectedHandler;
  var tags = state.tagsByHandler
  console.log(state.handlers.items)
  var handlersOriginal = state.handlers.items
  var isFetching = state.handlers.isFetching
  var lastUpdated = state.handlers.lastUpdated || Date.now()
  var handlers = [];
  for (var i = 0; i < handlersOriginal.length; i++) {
    var handler = {};
    handler['name'] = handlersOriginal[i];
    handler['tags'] = tags[handlersOriginal[i]] || []
    handlers.push(handler)
    if (handlersOriginal[i] === selectedHandlerName) {
      selectedHandler = handlersOriginal[i]
    }
  }
  let selectedHandler = handlers[0]
  for (var j = 0; j < handlers.length; j++) {
    if (handlers[j].name === selectedHandlerName) {
      selectedHandler = handlers[j]
    }
  }
  console.log('All handlers ', handlers)
  var events = state.events
  console.log('events are', events)
  return {
    handlers,
    selectedHandler,
    tags,
    isFetching,
    lastUpdated,
    events
  }
}

export default connect(mapStateToProps)(App)
