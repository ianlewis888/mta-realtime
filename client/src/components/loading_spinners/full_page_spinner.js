import React, { Component } from 'react';

export default class FullPageSpinner extends Component {
  render() {
    const display = this.props.display ? "block" : "none";
    return (
      <div className="spinner-bg" style={{ display: display }}>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );
  }
}
