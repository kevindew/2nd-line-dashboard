import React from 'react';
import './Statistics.css';

export default class Statistics extends React.Component {
  renderLast5mins(last5mins) {
    if (last5mins.checkReturned) {
      return this.renderLast5minsStats(last5mins);
    } else {
      return <h2>Unable to retrieve last 5 mins data from Graphite</h2>;
    }
  }

  renderLast30mins(last30mins) {
    if (last30mins.checkReturned) {
      return this.renderLast30minsStats(last30mins);
    } else {
      return <h2>Unable to retrieve last 30 mins data from Graphite</h2>;
    }
  }

  renderLast5minsStats(last5mins) {
    return (
      <div>
        <h2>20 mins to 15 mins ago CDN has served:</h2>
        <ul>
          <li>
            <strong>
              {Math.round(last5mins.cdnRequestsPerSecond)}
            </strong> requests / second
          </li>
          <li>
            <strong>
              {+last5mins.cdn4xxResponsePercentage.toFixed(2)}%
            </strong> 4xx responses
          </li>
          <li>
            <strong>
              {+last5mins.cdn5xxResponsePercentage.toFixed(2)}%
            </strong> 5xx responses
          </li>
        </ul>
        <h2>In the last 5 mins origin has served:</h2>
        <ul>
          <li>
            <strong>
              {Math.round(last5mins.originRequestsPerSecond)}
            </strong> requests / second
          </li>
          <li>
            <strong>
              {+last5mins.origin429ResponsePercentage.toFixed(2)}%
            </strong> 429 responses
          </li>
          <li>
            <strong>
              {+last5mins.originOther4xxResponsePercentage.toFixed(2)}%
            </strong> other 4xx responses
          </li>
          <li>
            <strong>
              {+last5mins.origin5xxResponsePercentage.toFixed(2)}%
            </strong> 5xx responses
          </li>
        </ul>
      </div>
    );
  }

  renderLast30minsStats(last30mins) {
    return (
      <div>
        <h2>In the last hour:</h2>
        <ul>
          <li>
            Sentry has
            received <strong>{last30mins.sentryErrorsLastHour}</strong> errors
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="Statistics">
        {this.renderLast5mins(this.props.graphite.last5mins)}
        {this.renderLast30mins(this.props.graphite.last30mins)}
      </div>
    );
  }
}
