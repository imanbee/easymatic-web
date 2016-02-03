import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchHandlers } from '../actions'
import Handlers from '../components/Handlers'

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
        const { handlers, tags, isFetching, lastUpdated } = this.props
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
                            <Handlers handlers={handlers} tags={tags}/>
                            </div>
                    }
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
        var handlers = state.handlers.items
        console.log('All handlers ', handlers)
        var isFetching = state.handlers.isFetching
        var lastUpdated = state.handlers.lastUpdated || Date.now()

        return {
            handlers,
            tags,
            isFetching,
            lastUpdated
        }
}

export default connect(mapStateToProps)(App)
