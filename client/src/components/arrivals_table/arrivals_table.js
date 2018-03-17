import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrivalsTableRows from './arrivals_table_rows';
import ArrivalsTableFooter from './arrivals_table_footer';
import ArrivalsTableMenu from './arrivals_table_menu';
import { toggleMenuState } from '../../actions/actions.js';

class ArrivalsTable extends Component {

  render() {
    const menuIcon = this.props.menuState ? "fa-close" : "fa-bars";
    const opacity = this.props.initialLoadState ? 0 : 1;
    const stationName = this.props.stationList[this.props.currentStation].stationName;
    return (
      <div className="arrivals-table__container">
        <table className="arrivals-table" style={{ opacity: opacity }}>
          <thead className="arrivals-table__header">
            <tr>
              <th colSpan="3" className="arrivals-table__station-name">
                <Link to="/">
                  <span className="fa fa-chevron-left arrivals-table__exit"></span>
                </Link>
                {stationName}
                <span
                  className={"fa "+menuIcon+" arrivals-table__menu-icon"}
                  onClick={() => {
                    this.props.dispatch(toggleMenuState());
                  }}>
                </span>
                {/*<span className="fa fa-star arrivals-table__favorite-icon"></span>*/}
              </th>
            </tr>
            <tr><ArrivalsTableMenu/></tr>
            <tr>
              <th>Line</th>
              <th>To</th>
              <th>Arrives in</th>
            </tr>
          </thead>
          <tbody>
            <ArrivalsTableRows
              arrivals={this.props.arrivalData.arrivals}
              timestamp={this.props.timestamp}
              options={this.props.arrivalFilters}
              arrivalsLoadState={this.props.arrivalsLoadState}
            />
            <ArrivalsTableFooter/>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    stationList: state.stationList,
    arrivalData: state.arrivalData,
    currentStation: state.currentStation,
    timestamp: state.timestamp,
    arrivalFilters: state.arrivalFilters,
    menuState: state.menuState,
    arrivalsLoadState: state.arrivalsLoadState,
    initialLoadState: state.initialLoadState
  };
})(ArrivalsTable);
