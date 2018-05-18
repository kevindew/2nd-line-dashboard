import React from 'react';
import IcingaAlert from './IcingaAlert';
import './IcingaAlerts.css';

export default function IcingaAlerts({ ci, integration, production, staging }) {
  return (
    <ul className="IcingaAlerts">
      <li className="IcingaAlerts__item">
        <IcingaAlert environment="Production" data={production}  />
      </li>
      <li className="IcingaAlerts__item">
        <IcingaAlert environment="Staging" data={staging} />
      </li>
      <li className="IcingaAlerts__item">
        <IcingaAlert environment="Integration" data={integration} />
      </li>
      <li className="IcingaAlerts__item">
        <IcingaAlert environment="CI" data={ci} />
      </li>
    </ul>
  );
}
