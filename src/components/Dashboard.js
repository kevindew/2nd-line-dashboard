import React from 'react';
import { connect } from 'react-redux';
import Metrics from './Metrics';
import './Dashboard.css';

export function Dashboard({ icinga, graphite }) {
  return (
    <div className="Dashboard">
      <header role="banner" className="Dashboard__header">
        <div className="Dashboard__header__container">
          GOV.UK 2nd Line
        </div>
      </header>
      <main className="Dashboard__main">
        <Metrics icinga={icinga} graphite={graphite} />
      </main>
      <footer className="Dashboard__footer"></footer>
    </div>
  );
}

const mapStateToProps = ({ icinga, graphite }) => {
  return { icinga, graphite };
}

export default connect(mapStateToProps)(Dashboard);
