import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchTagsIfNeeded } from '../actions'

export default class Handler extends Component {
    
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        this.props.dispatch(fetchTagsIfNeeded(this.props.handler))
        console.log('Handler componentDidMount with props', this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
        console.log('Handler componentWillReceiveProps with props', nextProps);
    }

    render() {
        return ( <div>{this.props.handler}</div> )
    }
}

Handler.propTypes = {
  handler: PropTypes.string.isRequired
}
export default connect()(Handler);
