import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import icons from '../../data/icons.js';
import { setArrivalFilters } from '../../actions/actions.js';

class ArrivalsTableMenu extends Component {
  constructor() {
    super();
    this.handleRouteFilterChange = this.handleRouteFilterChange.bind(this);
    this.handleDirectionFilterChange = this.handleDirectionFilterChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }

  handleRouteFilterChange = (e) => {
    const option = e.target.value === "All" ? null : e.target.value;
    this.props.dispatch(setArrivalFilters({ route: option }));
  }
  handleDirectionFilterChange = (e) => {
    const option = Number(e.target.value);
    this.props.dispatch(setArrivalFilters({ direction: option }));
  }

  handleLimitChange = (e) => {
    const option = Number(e.target.value);
    this.props.dispatch(setArrivalFilters({ limit: option }));
  }

  render() {
    const menuState = this.props.menuState ? "arrivals-table__menu--expanded" : "";
    const routeOptions = this.props.routeIds.map((routeId) => {
      return (<option key={routeId} value={routeId}>{routeId}</option>);
    });

    const limits = ["View All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const limitOptions = limits.map((d, i) => {
      return (<option key={i} value={i}>{d}</option>);
    });

    return (
      <td>
        <div className={"arrivals-table__menu "+menuState}>
          <div className="arrivals-table__menu-component">
            <label>Filter by route:</label>
            <select className="arrivals-table__menu-select" onChange={this.handleRouteFilterChange}>
              <option>All</option>
              {routeOptions}
            </select>
            <span className="fa fa-chevron-down arrivals-table__menu-select-icon"></span>
          </div>
          <div className="arrivals-table__menu-compenent">
            <label>Filter by direction:</label>
            <select
              className="arrivals-table__menu-select"
              value={this.props.arrivalFilters.direction}
              onChange={this.handleDirectionFilterChange}>
              <option value={0}>All</option>
              <option value={1}>North</option>
              <option value={2}>South</option>
            </select>
            <span className="fa fa-chevron-down arrivals-table__menu-select-icon"></span>
          </div>
          <div className="arrivals-table__menu-component">
            <label>Limit:</label>
            <select
              className="arrivals-table__menu-select"
              value={this.props.arrivalFilters.limit}
              onChange={this.handleLimitChange}>
              {limitOptions}
            </select>
            <span className="fa fa-chevron-down arrivals-table__menu-select-icon"></span>
          </div>
        </div>
      </td>
    );
  }
}

export default connect((state) => {
  return {
    menuState: state.menuState,
    routeIds: state.arrivalData.routeIds || [],
    arrivalFilters: state.arrivalFilters
  };
})(ArrivalsTableMenu)
