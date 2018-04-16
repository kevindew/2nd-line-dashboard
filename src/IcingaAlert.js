import React from 'react';

function IcingaAlert(props) {
  return <div className={`IcingaAlert IcingaAlert--${props.status}`}>
    <h3 className="IcingaAlert__header">{props.environment}</h3>
    <ul className="IcingaAlert__counts">
      <li className="IcingaAlert__count">
        <strong>3</strong> criticals
      </li>
      <li className="IcingaAlert__count">
        <strong>10</strong> warnings
      </li>
      <li className="IcingaAlert__count">
        <strong>5</strong> unknown
      </li>
    </ul>
  </div>;
}

export default IcingaAlert;
