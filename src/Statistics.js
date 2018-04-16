import React from 'react';

export default function Statistics() {
  return (
    <div className="Statistics">
      <h2 className="Statistics__header">In the last hour...</h2>
      <ul className="Statistics__all">
        <li className="Statistics__all__item">
          CDN has served (15 minute lag):
          <ul className="Statistics__sub-list">
            <li className="Statistics__sub-list__item">
              <strong>1612</strong> requests / second
            </li>
            <li className="Statistics__sub-list__item">
              <strong>0.3%</strong> 4xx responses
            </li>
            <li className="Statistics__sub-list__item">
              <strong>0%</strong> 5xx responses
            </li>
          </ul>
        </li>
        <li className="Statistics__all__item">
          Origin has served:
          <ul className="Statistics__sub-list">
            <li className="Statistics__sub-list__item">
              <strong>139</strong> requests / second
            </li>
            <li className="Statistics__sub-list__item">
              <strong>0.4%</strong> 429 responses
            </li>
            <li className="Statistics__sub-list__item">
              <strong>3%</strong> Other 4xx responses
            </li>
            <li className="Statistics__sub-list__item">
              <strong>0%</strong> 5xx responses
            </li>
          </ul>
        </li>
        <li className="Statistics__all__item">
          Sentry has received <strong>359</strong> errors
        </li>
      </ul>
    </div>
  );

}
