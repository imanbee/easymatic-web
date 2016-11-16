import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchTagsIfNeeded, selectHandler } from '../actions'

class Handler extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTagsIfNeeded(this.props.handler))
    console.log('Handler componentDidMount with props', this.props);
  }

  onSelect(handlerName) {
    this.props.dispatch(selectHandler(handlerName));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps
    console.log('Handler componentWillReceiveProps with props', nextProps);
    dispatch(fetchTagsIfNeeded(this.props.handler))
  }

  render() {
    return (
      <div onClick={this.onSelect.bind(this, this.props.handler)}>
      {this.props.handler}
    </div>
    )
  }
}

Handler.propTypes = {
  handler: PropTypes.string.isRequired
}
export default connect()(Handler);
