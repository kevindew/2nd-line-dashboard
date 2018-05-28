import {
  GRAPHITE_5MINS_SUCCESS,
  GRAPHITE_5MINS_FAILURE,
  GRAPHITE_30MINS_SUCCESS,
  GRAPHITE_30MINS_FAILURE
} from '../actions/graphite'

import graphiteReducer from './graphite';

describe('graphiteReducer', () => {
  it('has an inital state with empty objects', () => {
    const state = graphiteReducer(undefined, {});

    expect(state).toMatchObject({
      last5mins: {},
      last30mins: {}
    });
  });

  it('handles a GRAPHITE_5MINS_SUCCESS action', () => {
    const time = new Date().toISOString();

    const state = graphiteReducer(undefined, {
      type: GRAPHITE_5MINS_SUCCESS,
      time: time,
      cdnRequestsPerSecond: 1,
      cdn4xxResponsePercentage: 2,
      cdn5xxResponsePercentage: 3,
      originRequestsPerSecond: 4,
      origin429ResponsePercentage: 5,
      originOther4xxResponsePercentage: 6,
      origin5xxResponsePercentage: 7
    });

    expect(state).toMatchObject({
      last5mins: {
        lastCheck: time,
        checkReturned: true,
        cdnRequestsPerSecond: 1,
        cdn4xxResponsePercentage: 2,
        cdn5xxResponsePercentage: 3,
        originRequestsPerSecond: 4,
        origin429ResponsePercentage: 5,
        originOther4xxResponsePercentage: 6,
        origin5xxResponsePercentage: 7
      }
    });
  });

  it('handles a GRAPHITE_5MINS_FAILURE action', () => {
    const time = new Date().toISOString();

    const state = graphiteReducer(undefined, {
      type: GRAPHITE_5MINS_FAILURE,
      time: time,
    });

    expect(state).toMatchObject({
      last5mins: {
        lastCheck: time,
        checkReturned: false
      }
    });
  });

  it('handles a GRAPHITE_30MINS_SUCCESS action', () => {
    const time = new Date().toISOString();

    const state = graphiteReducer(undefined, {
      type: GRAPHITE_30MINS_SUCCESS,
      time: time,
      sentryErrorsLastHour: 100
    });

    expect(state).toMatchObject({
      last30mins: {
        lastCheck: time,
        checkReturned: true,
        sentryErrorsLastHour: 100
      }
    });
  });

  it('handles a GRAPHITE_30MINS_FAILURE action', () => {
    const time = new Date().toISOString();

    const state = graphiteReducer(undefined, {
      type: GRAPHITE_30MINS_FAILURE,
      time: time,
    });

    expect(state).toMatchObject({
      last30mins: {
        lastCheck: time,
        checkReturned: false
      }
    });
  });
});
