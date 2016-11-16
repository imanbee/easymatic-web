import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import { fetchHandlers } from '../../actions'
import HandlersList from '../../components/HandlersList'
import TagsList from '../../components/TagsList'
import EventsMonitor from '../../containers/EventsMonitor'
import './App.css'
import { grey300 } from 'material-ui/styles/colors'


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
    var handlersTagsContainerStyle = {
      height: '90vh',
      borderBottom: '1px solid',
      borderColor: grey300
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
              <Col xs={3} md={3} style={{height: '100%', overflowY: 'scroll'}}>
                <HandlersList handlers={handlers} selectedHandler={selectedHandler}/>
              </Col>
              <Col xs={6} md={6} style={{height: '100%', overflowY: 'scroll'}}>
                {selectedHandler && selectedHandler.tags && selectedHandler.tags.items && selectedHandler.tags.items.length > 0 &&
                    <TagsList tags={selectedHandler.tags.items} handler={selectedHandler} />
                }
              </Col>
              <Col xs={3} md={3} style={{height: '100%', overflowY: 'scroll'}}>
                <EventsMonitor events={events}/>
              </Col>
            </Row>
        }
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
  let selectedHandlerName = state.selectedHandler;
  var tags = state.tagsByHandler
  var handlersOriginal = state.handlers.items
  var isFetching = state.handlers.isFetching
  var lastUpdated = state.handlers.lastUpdated || Date.now()
  var handlers = [];
  for (var i = 0; i < handlersOriginal.length; i++) {
    var handler = {};
    handler['name'] = handlersOriginal[i];
    handler['tags'] = tags[handlersOriginal[i]] || []
    handlers.push(handler)
  }
  let selectedHandler = handlers[0]
  for (var j = 0; j < handlers.length; j++) {
    if (handlers[j].name === selectedHandlerName) {
      selectedHandler = handlers[j]
    }
  }
  var events = state.events
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
