import React, { Component } from 'react';
import * as mtaLogo from '../images/mta_logo.svg';

export default class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <h1 className="hero__heading">
           <object className="hero__logo" aria-label="MTA Logo" data={mtaLogo}></object> 
          &nbsp;Subway Arrival Times</h1>
      </div>
    );
  }
}
