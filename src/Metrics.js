import React from 'react';
import IcingaAlerts from './IcingaAlerts';
import Statistics from './Statistics';
import Status from './Status';

export default function Metrics({ icinga }) {
  return (
    <div className="metrics">
      <div className="metrics__column">
        <IcingaAlerts
          ci={icinga.ci}
          integration={icinga.integration}
          production={icinga.production}
          staging={icinga.staging} />
      </div>
      <div className="metrics__column">
        <Statistics />
        <Status />
      </div>
    </div>
  );
}
