import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchHandlersIfNeeded } from '../actions'
import Picker from '../components/Picker'
import Handlers from '../components/Handlers'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props
    dispatch(fetchHandlersIfNeeded())
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, selectedReddit } = nextProps
    dispatch(fetchHandlersIfNeeded())
  }

  handleChange(nextReddit) {
    this.props.dispatch()
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(fetchHandlersIfNeeded())
  }

  render() {
    const { selectedReddit, handlers, isFetching, lastUpdated } = this.props
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && handlers.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && handlers.length === 0 &&
          <h2>Empty.</h2>
        }
        {handlers.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Handlers handlers={handlers} />
          </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  handlers: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedReddit, allHandlers} = state
  const {
    isFetching,
    lastUpdated,
    items: handlers 
  } = allHandlers || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    handlers,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
