import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

export default class Event extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
    }

    render() {
        var eventStyle = {
            display: 'inline-block',
            padding: '10px',
            marginBottom: '5px',
            color: 'rgba(0, 0, 0, 0.8)',
            width: '100%',
            float: 'left',
            borderBottom: '1px solid rgba(0, 0, 0, 0.8)'
        }
        var event = this.props.event
        var processedEvent = {}
        for (var i in event.event) {
          processedEvent = {
            source: i,
            value: event.event[i]
          }
        }
        return (
          <div style={eventStyle}>
            <b>{processedEvent.source}</b>: {processedEvent.value}
          </div>
        )
    }
}

Event.propTypes = {
  event: PropTypes.object.isRequired
}
export default connect()(Event);
