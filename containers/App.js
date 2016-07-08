import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchHandlers } from '../actions'
import HandlersList from '../components/HandlersList'
import DevTools from '../containers/DevTools'
import EventsMonitor from '../containers/EventsMonitor'

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

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
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
        const { handlers, tags, isFetching, lastUpdated, events } = this.props
        var titleStyle = {
            color: '#ffffff'
        }
        var style = {
          position: 'relative',
          height: '100vh'
        }
        var handlersListStyle = {
          opacity: isFetching ? 0.5 : 1,
          height: '50vh',
          overflow: 'scroll'
        }
        return (
                <div style={style}>
                <h1 style={titleStyle}>Smart House<small>  handlers and tags</small></h1>
                    {isFetching && handlers.length === 0 &&
                        <h2>Loading...</h2>
                    }
                    {!isFetching && handlers.length === 0 &&
                        <h2>Empty.</h2>
                    }
                    {handlers.length > 0 &&
                        <div style={handlersListStyle}>
                            <HandlersList handlers={handlers} />
                            </div>
                    }
                    <EventsMonitor events={events}/>
                    </div>
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
  var tags = state.tagsByHandler
  console.log(state.handlers.items)
  var handlersOriginal = state.handlers.items
  console.log('All handlers ', handlers)
  var isFetching = state.handlers.isFetching
  var lastUpdated = state.handlers.lastUpdated || Date.now()
  var handlers = [];
  for (var i = 0; i < handlersOriginal.length; i++) {
      var handler = {};
      handler['name'] = handlersOriginal[i];
      handler['tags'] = tags[handlersOriginal[i]] || []
      handlers.push(handler)
  }
  var events = state.events
  console.log('events are', events)
  return {
      handlers,
      tags,
      isFetching,
      lastUpdated,
      events
  }
}

export default connect(mapStateToProps)(App)
