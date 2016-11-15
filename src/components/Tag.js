import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle';
import { ListItem } from 'material-ui/List';
import { updateTag } from '../actions'

class Tag extends Component {

  onToggle(tag, handler) {
    console.log('Switch changed with state', tag, handler)
    var st = (tag.value === '1' ? '0' : '1')
    this.props.dispatch(updateTag(handler.name, tag.name, st))
  }

  render() {
    var tag = this.props.tag
    var handler = this.props.handler
    return (
      <ListItem primaryText={tag.name} rightToggle={
        <Toggle
          toggled={tag.value === '1'}
          onToggle={this.onToggle.bind(this, tag, handler)}
        />
      }>
    </ListItem>
    )
  }
}

export default connect()(Tag);
