import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

export default class TagsList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
            console.log('TagsList componentDidMount with props', this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps
            console.log('TagsList componentWillReceiveProps with props', nextProps);
    }

    render() {
        var tags = this.props.tags
        return (
        <ul>
            {tags.map((tag, i) =>
            <li key={i}>{tag.name} : {tag.value}</li>
            )}
        </ul>
        )
    }
}

TagsList.propTypes = {
  tags: PropTypes.array.isRequired
}
export default connect()(TagsList);
