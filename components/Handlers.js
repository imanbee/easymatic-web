import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchTagsIfNeeded } from '../actions'

export default class Handlers extends Component {
    
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
        console.log(nextProps)
    }

    handleClick(handler, element) {
        this.props.dispatch(fetchTagsIfNeeded(handler))
    }

    render() {
        return (
        <ul>
            {this.props.handlers.map((handler, i) =>
            <li key={i} onClick={this.handleClick.bind(this, handler)}>{handler}</li>
            )}
        </ul>
        )
    }
}

Handlers.propTypes = {
  handlers: PropTypes.array.isRequired
}
export default connect()(Handlers);
