import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Tag from '../components/Tag'

class TagsList extends Component {
  render() {
    var tags = this.props.tags
    var handler = this.props.handler
    var listStyle = {
      listStyleType: 'none',
      paddingLeft: '0px',
      marginTop: '10px'
    }
    console.log('Tags is ', this.props.handler, this.props.tags)
    return (
      <ul style={listStyle}>
      {tags.map((tag, i) =>
        <Tag key={i} tag={tag} handler={handler}/>
      )}
      </ul>
    )
  }
}

TagsList.propTypes = {
  tags: PropTypes.array.isRequired
}
export default connect()(TagsList);
