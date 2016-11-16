import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startFetchEvents } from '../actions'
import { green300 } from 'material-ui/styles/colors'
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
    if (events.isFetching === false) {
      dispatch(startFetchEvents())
    }

  }

  handleChange(nextHandler) {
    this.props.dispatch()
  }

  handleRefreshClick(e) {
    e.preventDefault()
  }

  render() {
    var data = this.props.events.data
    var processedData = [];
    for (var i in data) {
      if (data.hasOwnProperty(i)){
        for (var j in data[i]) {
          if (data[i].hasOwnProperty(j)) {
            var d = {
              id: j,
              event: data[i][j]
            }
            processedData.push(d);
          }
        }
      }
    }
    var monitorStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '30vh',
      backgroundColor: green300,
      overflow: 'scroll',
      opacity: '0.5'
    }
    console.log('Processed data is ', processedData)
    processedData.reverse()
    return (
      <div className="events-monitor" style={monitorStyle}>
        <Grid>
        <Row>
          <Col md={3}>
            <List>
              <Subheader>Events</Subheader>
              {processedData.map((event, i) =>
                <ListItem primaryText={event.event.tag} secondaryText={event.event.handler}>
                  <span style={{float: 'right'}}>{event.event.value}</span>
                </ListItem>
              )}
            </List>
          </Col>
        </Row>
      </Grid>
      </div>
    )
  }
}

export default connect()(EventsMonitor);
