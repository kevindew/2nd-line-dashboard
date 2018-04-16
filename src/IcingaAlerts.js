import React, { Component } from 'react';
import IcingaAlert from './IcingaAlert';

class IcingaAlerts extends Component {
  render() {
    return (
      <ul className="IcingaAlerts">
        <li className="IcingaAlerts__item">
          <IcingaAlert environment="Production" status="critical" />
        </li>
        <li className="IcingaAlerts__item">
          <IcingaAlert environment="Staging" status="warning" />
        </li>
        <li className="IcingaAlerts__item">
          <IcingaAlert environment="Integration" status="clear" />
        </li>
        <li className="IcingaAlerts__item">
          <IcingaAlert environment="CI" status="unknown" />
        </li>
      </ul>
    );
  }
}

export default IcingaAlerts;
