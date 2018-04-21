import React, { Component } from 'react';
import { connect } from 'react-redux';
import Metrics from './Metrics';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <header role="banner" className="dashboard__header">
          <div className="dashboard__header__container">
            GOV.UK 2nd Line
          </div>
        </header>
        <main className="dashboard__main">
          <Metrics />
        </main>
        <footer className="dashboard__footer"></footer>
      </div>
    );
  }
}

export default connect()(Dashboard);
