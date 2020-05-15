import React from 'react';
import PropTypes from 'prop-types';
import FilterButton from './FilterButton';

class Filters extends React.Component {

  render() {
    return (
      <div className="btn-wrapper mb-4 d-flex" style={{'justifyContent': 'space-between'}}>
        <div className="order-container">
          <FilterButton
            text="Data"
            name="created_at"
            handleClick={() => this.props.handleOrder('created_at')}
            activeButton={this.props.activeOrderButton('created_at')}
            handleSortIcon={this.props.handleSortIcon('created_at')}
          />
          <FilterButton
            text="Likes"
            name="likes"
            handleClick={() => this.props.handleOrder('likes')}
            activeButton={this.props.activeOrderButton('likes')}
            handleSortIcon={this.props.handleSortIcon('likes')}
          />
        </div>
        <div className="filter-container">
          <FilterButton
            text="Sem Respostas"
            name="no-answers"
            handleClick={() => this.props.handleFilter('no-answers')}
            activeButton={this.props.activeFilterButton('no-answers')}
          />
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  handleOrder: PropTypes.func.isRequired,
  activeOrderButton: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  activeFilterButton: PropTypes.func.isRequired,
  handleSortIcon: PropTypes.func.isRequired,
};

export default Filters;