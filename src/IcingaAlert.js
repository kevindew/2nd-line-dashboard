import React from 'react';
import { icingaHostname } from './actions/icinga';

export default class IcingaAlert extends React.Component {
  statusClass() {
    const data = this.props.data;

    if (!data.checkReturned) {
      return 'no-connection';
    }

    if (data.critical) {
      return 'critical';
    }

    if (data.unknown) {
      return 'unknown';
    }

    if (data.warning) {
      return 'warning';
    }

    return 'clear';
  }

  countNode(count, singular, plural) {
    const text = count === 1 ? singular : plural;
    const toShow = count === undefined ? '?' : count;
    return (
      <li className="IcingaAlert__count">
        <strong>{toShow}</strong> {text}
      </li>
    );
  }

  environmentUrl() {
    const hostname = icingaHostname(this.props.environment.toLowerCase());
    return `https://${hostname}`;
  }

  render() {
    return (
      <a
        href={this.environmentUrl()}
        className={`IcingaAlert IcingaAlert--${this.statusClass()}`}>
        <h3 className="IcingaAlert__header">{this.props.environment}</h3>
        <ul className="IcingaAlert__counts">
          {this.countNode(this.props.data.critical, 'critical', 'criticals')}
          {this.countNode(this.props.data.warning, 'warning', 'warnings')}
          {this.countNode(this.props.data.unknown, 'unknown', 'unknown')}
        </ul>
      </a>
    );
  }
}
