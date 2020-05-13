import React from 'react';
import PropTypes from 'prop-types';
import FilterButton from './FilterButton';

class Filters extends React.Component {

  render() {
    return (
      <div className="btn-wrapper mb-4">
        <FilterButton
          text="Data"
          name="created_at"
          handleOrder={() => this.props.handleOrder('created_at')}
          activeOrderButton={this.props.activeOrderButton('created_at')}
          handleSortIcon={this.props.handleSortIcon('created_at')}
        />
        <FilterButton
          text="Likes"
          name="likes"
          handleOrder={() => this.props.handleOrder('likes')}
          activeOrderButton={this.props.activeOrderButton('likes')}
          handleSortIcon={this.props.handleSortIcon('likes')}
        />
      </div>
    );
  }
}

Filters.propTypes = {
  handleOrder: PropTypes.func.isRequired,
  activeOrderButton: PropTypes.func.isRequired,
  handleSortIcon: PropTypes.func.isRequired,
};

export default Filters;