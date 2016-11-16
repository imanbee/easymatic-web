import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startFetchEvents } from '../actions'
import { green100 } from 'material-ui/styles/colors'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'

class EventsMonitor extends Component {
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
    const { events, dispatch } = nextProps
    let evs = events.data;
    let lastEvent = evs[evs.length-1]
    console.log('Last event is', evs, lastEvent)
    if (events.isFetching === false) {
      dispatch(startFetchEvents(lastEvent.id))
    }
  }

  handleChange(nextHandler) {
    this.props.dispatch()
  }

  handleRefreshClick(e) {
    e.preventDefault()
  }

  render() {
    let events = this.props.events.data
    return (
      <List style={{
        borderLeft: '1px solid rgb(224, 224, 224)',
        height: '100%',
        backgroundColor: green100,
      }}>
      <Subheader>Events</Subheader>
      {events.slice(0).reverse().map((event, i) =>
        <ListItem key={i} primaryText={event.tag} secondaryText={event.handler}>
          <span style={{float: 'right'}}>{event.value}</span>
        </ListItem>
      )}
    </List>
    )
  }
}

export default connect()(EventsMonitor);
