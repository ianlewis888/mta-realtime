import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setInitialArrivals,
  clearUpdateInterval,
  clearInactivityInterval,
  updateIdleTime
} from '../../actions/actions';

class IdleMessage extends Component {
  componentWillMount() {
    this.props.dispatch(clearInactivityInterval());
    this.props.dispatch(clearUpdateInterval());
  }
  componentWillUnmount() {
    this.props.dispatch(setInitialArrivals());
  }

  render() {
    return (
      <div className="inactivity__container">
        You have been logged out due to inactivity o__0
        <br/>
        <br/>
        <Link to="/">Click here</Link> to start a new session.
      </div>
    );
  }
}

export default connect(state => {
  return {};
})(IdleMessage);
