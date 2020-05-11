import React from 'react';
import {Button} from "reactstrap";

class FilterButton extends React.Component {
  render() {
    return (
      <Button
        className="btn-icon mb-3 mb-sm-0 ml-1"
        color={this.props.activeOrderButton}
        type="button"
        onClick={this.props.handleOrder}
      >
        <span className="btn-inner--icon mr-1">
          <i className={`fa ${this.props.handleSortIcon}`} />
        </span>
        <span className="btn-inner--text">{this.props.text}</span>
      </Button>
    );
  }
}

export default FilterButton;