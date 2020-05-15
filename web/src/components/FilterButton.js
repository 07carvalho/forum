import React from 'react';
import {Button} from "reactstrap";
import PropTypes from "prop-types";


class FilterButton extends React.Component {
  render() {
    return (
      <Button
        className="btn-icon mb-3 mb-sm-0 ml-1"
        color={this.props.activeButton}
        type="button"
        onClick={this.props.handleClick}
      >
        {this.props.handleSortIcon && <span className="btn-inner--icon mr-1">
          <i className={`fa ${this.props.handleSortIcon}`} />
        </span>}
        <span className="btn-inner--text">{this.props.text}</span>
      </Button>
    );
  }
}

FilterButton.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  activeButton: PropTypes.func.isRequired,
  handleSortIcon: PropTypes.func,
};

export default FilterButton;