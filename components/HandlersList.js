import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchTagsIfNeeded } from '../actions'
import Handler from '../components/Handler'
import TagsList from '../components/TagsList'

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

    render() {
        var style = {
            listStyleType: 'none'
        }
        return (
        <ul style={style}>
            {this.props.handlers.map((handler, i) =>
            <li key={i} onClick={this.handleClick.bind(this, handler)}>
                <Handler handler={handler.name} />
                {handler && handler.tags && handler.tags.items && handler.tags.items.length > 0 &&
                <TagsList tags={handler.tags.items} /> 
                }
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
