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
        // this.props.dispatch(fetchTagsIfNeeded(handler.name))
    }

    render() {
        var borderColor = '#00695C'
        var listStyle = {
            listStyleType: 'none',
            paddingLeft: '0px',
            width: '50%'
        }
        var handlerStyle = {
            padding: '5px',
            marginBottom: '10px',
            backgroundColor: '#43A047',
            color: '#FFFFFF'
        }
        return (
        <ul style={listStyle}>
            {this.props.handlers.map((handler, i) =>
            <li style={handlerStyle} key={i} onClick={this.handleClick.bind(this, handler)}>
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
