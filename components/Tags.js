import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

export default class Tags extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
            console.log('componentDidMount with props', this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
            console.log('tags componentWillReceiveProps with props', nextProps);
    }

    render() {
        return (
                <div>
                    {this.props.tags}
                </div>
               )
    }
}

Tags.propTypes = {
  tags: PropTypes.object.isRequired
}
export default connect()(Tags);
