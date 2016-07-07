import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Switch from 'react-bootstrap-switch'
import { updateTag } from '../actions'

export default class Tag extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
    }

    onSwitchChange(tag, handler, state) {
        console.log('Switch changed with state', tag, handler, state)
        var st = (state ? '1' : '0')
        this.props.dispatch(updateTag(handler.name, tag.name, st))
    }

    render() {
        var tag = this.props.tag
        var handler = this.props.handler
        return (
        <li style={{padding: '8px', listStyleType: 'none'}}>
            <span style={{marginRight: '10px'}}>{tag.name}</span>

            {(tag.value == '0' || tag.value == '1') &&
            <Switch size="mini" onChange={this.onSwitchChange.bind(this, tag, handler)} state={tag.value == '1'} handleWidth="auto"/>
            }

            {tag.value != '0' && tag.value != '1' &&
            <span>{tag.value}</span>
            }

        </li>
        )
    }
}

Tag.propTypes = {
}
export default connect()(Tag);
