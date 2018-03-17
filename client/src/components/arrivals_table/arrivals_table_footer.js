import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setArrivalFilters } from '../../actions/actions';

class ArrivalsTableFooter extends Component {
  render() {
    const inactiveClassName = "arrivals-table__btn";
    const activeClassName = "arrivals-table__btn arrivals-table__btn--active";
    const buttons = [
      <button key="0"
        className={this.props.arrivalFilters.direction===0 ? activeClassName : inactiveClassName}
        onClick={() => { this.props.dispatch(setArrivalFilters({ direction: 0 })); }}>
        All
      </button>,
      <button key="1"
        className={this.props.arrivalFilters.direction===1 ? activeClassName : inactiveClassName}
        onClick={() => { this.props.dispatch(setArrivalFilters({ direction: 1 })); }}>
        North
      </button>,
      <button key="2"
        className={this.props.arrivalFilters.direction===2 ? activeClassName : inactiveClassName}
        onClick={() => { this.props.dispatch(setArrivalFilters({ direction: 2 })); }}>
        South
      </button>
    ];
    return (
      <tr className="arrivals-table__row">
        <td colSpan="3">
          {buttons}
        </td>
      </tr>
    );
  }
}

export default connect((state) => {
  return { arrivalFilters: state.arrivalFilters };
})(ArrivalsTableFooter);
