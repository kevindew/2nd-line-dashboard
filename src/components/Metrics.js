import React from 'react';
import IcingaAlerts from './IcingaAlerts';
import Statistics from './Statistics';
import './Metrics.css';

export default function Metrics({ icinga, graphite }) {
  return (
    <div className="Metrics">
      <div className="Metrics__column">
        <IcingaAlerts
          ci={icinga.ci}
          integration={icinga.integration}
          production={icinga.production}
          staging={icinga.staging} />
      </div>
      <div className="Metrics__column">
        <Statistics graphite={graphite} />
      </div>
    </div>
  );
}
