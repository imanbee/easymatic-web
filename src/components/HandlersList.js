import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Handler from '../components/Handler'
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);


class HandlersList extends Component {
  render() {
    return (
      <SelectableList defaultValue={0}>
        <Subheader>Handlers</Subheader>
        {this.props.handlers.map((handler, i) =>
          <ListItem key={i} value={i}>
            <Handler handler={handler.name} />
          </ListItem>
        )}
      </SelectableList>
    )
  }
}

HandlersList.propTypes = {
  handlers: PropTypes.array.isRequired
}
export default connect()(HandlersList);
