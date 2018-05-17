import React from 'react';
import { connect } from 'react-redux';
import Metrics from './Metrics';
import './Dashboard.css';

function Dashboard({ icinga, graphite }) {
  return (
    <div className="dashboard">
      <header role="banner" className="dashboard__header">
        <div className="dashboard__header__container">
          GOV.UK 2nd Line
        </div>
      </header>
      <main className="dashboard__main">
        <Metrics icinga={icinga} graphite={graphite} />
      </main>
      <footer className="dashboard__footer"></footer>
    </div>
  );
}

const mapStateToProps = ({ icinga, graphite }) => {
  return { icinga, graphite };
}

export default connect(mapStateToProps)(Dashboard);
