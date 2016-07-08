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
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
    }

    updateSpinnerClass(tags) {
        var spinnerClass = 'fa fa-small fa-refresh'+(tags.isFetching ? ' fa-spin' : '')
        return spinnerClass
    }

    render() {
        var borderColor = '#00695C'
        var listStyle = {
            listStyleType: 'none',
            paddingLeft: '0px',
            width: '50%'
        }
        var handlerStyle = {
            backgroundColor: '#43A047',
            color: '#FFFFFF'
        }
        var spinnerStyle={
            marginLeft: '10px',
            fontSize: '12px',
            cursor: 'pointer'
        }
        return (
        <ul style={listStyle}>
            {this.props.handlers.map((handler, i) =>

            <li style={handlerStyle} key={i}>
                <Handler handler={handler.name} />
                {handler && handler.tags && handler.tags.items && handler.tags.items.length > 0 &&
                <TagsList tags={handler.tags.items} handler={handler} />
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
