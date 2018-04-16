import React, { Component } from 'react';
import IcingaAlerts from './IcingaAlerts';
import Statistics from './Statistics';
import Status from './Status';

class Metrics extends Component {
  render() {
    return (
      <div className="metrics">
        <div className="metrics__column">
          <IcingaAlerts />
        </div>
        <div className="metrics__column">
          <Statistics />
          <Status />
        </div>
      </div>
    );
  }
}

export default Metrics;
