import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import createHistory from "history/createBrowserHistory";
import Hero from './hero';
import StationInput from './station_search/station_input';
import ArrivalsContainer from './arrivals_table/arrivals_container';
import FullPageSpinner from './loading_spinner';
import IdleMessage from './inactivity/idle_message';
import googleTagManager from '../functions/google-tag-manager';
import {
  intitializeFirebase,
  updateTimestamp,
  setTimestampInterval,
  setInitialArrivals,
  escapeInitialArrivals
} from '../actions/actions.js';

const history = createHistory();

class Main extends Component {

  componentWillMount() {
    const location = window.location.pathname.split("/");
    const inactive = (location[location.length - 1] === "inactivity");
    this.props.dispatch(intitializeFirebase());
    this.props.dispatch(updateTimestamp());
    this.props.dispatch(setTimestampInterval());
    googleTagManager();
    if (!inactive) {
      this.props.dispatch(setInitialArrivals());
    }
    else {
      this.props.dispatch(escapeInitialArrivals());
    }
  }

  render() {
    return (
      <div>
        <Hero />
        <FullPageSpinner display={this.props.initialLoadState}/>
        <Router history={history}>
          <Switch>
            <Route path="/stations/:complexId" component={ArrivalsContainer}/>
            <Route path="/inactivity" component={IdleMessage}/>
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
