import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Handler from '../components/Handler'
import TagsList from '../components/TagsList'

class HandlersList extends Component {
  updateSpinnerClass(tags) {
    var spinnerClass = 'fa fa-small fa-refresh'+(tags.isFetching ? ' fa-spin' : '')
    return spinnerClass
  }

  render() {
    var listStyle = {
      listStyleType: 'none',
      paddingLeft: '0px',
      width: '50%'
    }
    var handlerStyle = {
      backgroundColor: '#43A047',
      color: '#FFFFFF'
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
