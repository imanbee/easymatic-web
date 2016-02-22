import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { startFetchEvents } from '../actions'

export default class EventsMonitor extends Component {
    constructor(props) {
        super(props)
            this.handleChange = this.handleChange.bind(this)
            this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(startFetchEvents())
    }

    componentWillReceiveProps(nextProps) {
        console.log('EventsMonitor will receive props', nextProps)
        const { events, dispatch } = nextProps
        if (events.isFetching == false) {
            console.log('EventsMonitor startFetchEvents')
            dispatch(startFetchEvents())
        }
        
    }

    handleChange(nextHandler) {
        this.props.dispatch()
    }

    handleRefreshClick(e) {
        e.preventDefault()
        const { dispatch } = this.props
    }

    render() {
        var titleStyle = {
            color: '#ffffff'
        }
        var events = [];
        var data = this.props.events.data
            console.log('Data is ', data)
        for (var i in data) {
            console.log(i)
        }
            return (
                    <div>

                    </div>
                        )
    }
}

export default connect()(EventsMonitor);
