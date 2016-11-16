import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Handler from '../components/Handler'
import {List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { green100 } from 'material-ui/styles/colors';

class HandlersList extends Component {
  render() {
    let selectedHandler = this.props.selectedHandler;
    let activeStyle = {
      backgroundColor: green100
    }
    return (
      <List style={{
        borderRight: '1px solid rgb(224, 224, 224)',
        height: '100%'
      }}>
        <Subheader>Handlers</Subheader>
        {this.props.handlers.map((handler, i) =>
          <ListItem value={i} data-name={handler.name} data-selected={selectedHandler.name} style={(handler.name === selectedHandler.name) ? activeStyle : {}}>
            <Handler handler={handler.name} />
          </ListItem>
        )}
      </List>
    )
  }
}

HandlersList.propTypes = {
  handlers: PropTypes.array.isRequired
}
export default connect()(HandlersList);
