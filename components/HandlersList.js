import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchTagsIfNeeded } from '../actions'
import Handler from '../components/Handler'
import Tags from '../components/Tags'

export default class HandlersList extends Component {
    
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        console.log('HandlersList componentDidMount with props', this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
        console.log('HandlersList componentWillReceiveProps with props', nextProps);
    }

    handleClick(handler, element) {
        this.props.dispatch(fetchTagsIfNeeded(handler.name))
    }

    filterTags(handler) {
        console.log('Filter tags', handler, this.props.tags)
        return this.props.tags
    }

    render() {
        return (
        <ul>
            {this.props.handlers.map((handler, i) =>
            <li key={i} onClick={this.handleClick.bind(this, handler)}>
                <Handler handler={handler.name} />
                {handler.tags}
            </li>
            )}
        </ul>
        )
    }
}

HandlersList.propTypes = {
  handlers: PropTypes.array.isRequired
}
export default connect()(HandlersList);
