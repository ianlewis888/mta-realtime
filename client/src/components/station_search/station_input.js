import React, { Component } from 'react';
import { connect } from 'react-redux';
import Results from './station_results';

class StationInput extends Component {

  state = {
    query: '',
    results: []
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.getResults();
      }
      else {
        this.setState({...this.state, results: []});
      }
    });
  }

  getResults = () => {
    var results = [];
    const exp = new RegExp(this.state.query, 'gi');
    for (var complexId in this.props.stationList) {
      const station = this.props.stationList[complexId];
      if (station.stationName.match(exp)) {
        results.push(station);
      }
    }
    this.setState({...this.state, results: results});
  }
  render() {
    return (
      <div>
        <input
          className="station-search__input"
          placeholder="Search for a station"
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          type="text">
        </input>
        <Results results={this.state.results} />
      </div>
    );
  }
}

export default connect((state) => {
  return { stationList: state.stationList, currentStation: state.currentStation };
})(StationInput);
