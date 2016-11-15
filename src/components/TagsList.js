import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Tag from '../components/Tag'

class TagsList extends Component {
  render() {
    var tags = this.props.tags
    var handler = this.props.handler
    console.log('Tags is ', this.props.handler, this.props.tags)
    return (
      <List>
        <Subheader>Tags</Subheader>
        {tags.map((tag, i) =>
          <Tag key={i} tag={tag} handler={handler}/>
        )}
      </List>
    )
  }
}

TagsList.propTypes = {
  tags: PropTypes.array.isRequired
}
export default connect()(TagsList);
