import React, { Component } from 'react';

export default class FullPageSpinner extends Component {
  render() {
    const display = this.props.display ? "inline-block" : "none";
    return (
      <div
        className="spinner-bg"
        style={{
          display: display,
          width: "100%",
          height: "100%"
        }}>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );
  }
}
