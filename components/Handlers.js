import React, { PropTypes, Component } from 'react'

export default class Handlers extends Component {
  render() {
    return (
      <ul>
        {this.props.handlers.map((handler, i) =>
          <li key={i}>{hanler}</li>
        )}
      </ul>
    )
  }
}

Handlers.propTypes = {
  handlers: PropTypes.array.isRequired
}
