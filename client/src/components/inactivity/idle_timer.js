import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  setInactivityInterval,
  updateIdleTime
} from '../../actions/actions';

class IdleTimer extends Component {
  constructor(props) {
    super(props);
    this.handleActivity = this.handleActivity.bind(this);
  }

  handleActivity = (e) => {
    this.props.dispatch(updateIdleTime(0));
  }

  componentWillMount() {
    this.props.dispatch(setInactivityInterval());
    document.addEventListener("mousemove", this.handleActivity);
    document.addEventListener("keypress", this.handleActivity);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleActivity);
    document.removeEventListener("keypress", this.handleActivity);
  }

  render() {
    const listener = (this.props.idleTime > 5)
      ? (<Redirect to="/inactivity"/>)
      : (<div
          className="idle-time-listener"
          style={{opacity: 0, pointerEvents: "none"}}>
        </div>);
    return listener;
  }
}

export default connect(state => {
  return {
    idleTime: state.idleTime
  };
})(IdleTimer);
