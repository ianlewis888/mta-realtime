import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import ArrivalsTable from './arrivals_table';
import {
  setCurrentStation,
  removeCurrentStation,
  setDefaultArrivalFilters,
  resetMenuState
} from '../../actions/actions.js';

class ArrivalsContainer extends Component {

  componentWillMount() {
    const complexId = this.props.match.params.complexId;
    if (this.props.stationList[complexId]) {
      this.props.dispatch(setCurrentStation(complexId));
      this.props.dispatch(setDefaultArrivalFilters());
      this.props.dispatch(resetMenuState());
    }
  }

  componentWillUnmount() {
    this.props.dispatch(removeCurrentStation(this.props.currentStation));
  }

  render() {
    const complexId = this.props.match.params.complexId;
    const getTable = () => {
      if (this.props.stationList[complexId]) {
        return (<ArrivalsTable />);
      } else {
        return (<Redirect to="/"/>);
      }
    }
    return getTable();
  }
}

export default connect((state) => {
  return {
    currentStation: state.currentStation,
    stationList: state.stationList
  };
})(ArrivalsContainer);
