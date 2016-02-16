import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchHandlers, startFetchEvents } from '../actions'
import HandlersList from '../components/HandlersList'

class App extends Component {
    constructor(props) {
        super(props)
            this.handleChange = this.handleChange.bind(this)
            this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchHandlers())
        dispatch(startFetchEvents())
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
        var titleStyle = {
            color: '#ffffff'
        }
            return (
                    <div>
                    <h1 style={titleStyle}>Smart House<small>  handlers and tags</small></h1>
                    {isFetching && handlers.length === 0 &&
                        <h2>Loading...</h2>
                    }
                    {!isFetching && handlers.length === 0 &&
                        <h2>Empty.</h2>
                    }
                    {handlers.length > 0 &&
                        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <HandlersList handlers={handlers} />
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

        return {
            handlers,
            tags,
            isFetching,
            lastUpdated
        }
}

export default connect(mapStateToProps)(App)
