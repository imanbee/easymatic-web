import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Switch from 'react-bootstrap-switch'

export default class Tag extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        console.log('Tag componentDidMount with props', this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
        console.log('Tag componentWillReceiveProps with props', nextProps);
    }

    render() {
        var tag = this.props.tag
        return (
        <li style={{padding: '8px', listStyleType: 'none'}}>
            <span style={{marginRight: '10px'}}>{tag.name}</span>

            {tag.value == '0' && 
            <Switch size="mini" state={tag.value == '1'} handleWidth="auto"/> 
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
