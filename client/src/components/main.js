import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import createHistory from "history/createBrowserHistory";
import Hero from './hero';
import StationInput from './station_search/station_input';
import ArrivalsContainer from './arrivals_table/arrivals_container';
import FullPageSpinner from './loading_spinners/full_page_spinner';
import {
  intitializeFirebase,
  updateTimestamp,
  setTimestampInterval,
  setInitialArrivals,
  setUpdateInterval
} from '../actions/actions.js';

const history = createHistory();

class Main extends Component {
  componentWillMount() {
    this.props.dispatch(intitializeFirebase());
    this.props.dispatch(setInitialArrivals());
    this.props.dispatch(setUpdateInterval());
    this.props.dispatch(updateTimestamp());
    this.props.dispatch(setTimestampInterval());
  }
  render() {
    return (
      <div>
        <Hero />
        <FullPageSpinner display={this.props.initialLoadState}/>
        <Router history={history}>
          <Switch>
            <Route path="/stations/:complexId" component={ArrivalsContainer}/>
            <Route path="/" component={StationInput}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    initialLoadState: store.initialLoadState
  };
})(Main);
