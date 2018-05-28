import {
  ICINGA_DATA_SUCCESS,
  ICINGA_DATA_FAILURE
} from '../actions/icinga'

import icingaReducer from './icinga';

describe('icingaReducer', () => {
  it('has an inital state with empty objects', () => {
    const state = icingaReducer(undefined, {});

    expect(state).toMatchObject({
      ci: {},
      integration: {},
      production: {},
      staging: {}
    });
  });

  it('handles a ICINGA_DATA_SUCCESS action', () => {
    const time = new Date().toISOString();

    const state = icingaReducer(undefined, {
      type: ICINGA_DATA_SUCCESS,
      time: time,
      environment: 'production',
      critical: 1,
      warning: 2,
      unknown: 3
    });

    expect(state).toMatchObject({
      production: {
        lastCheck: time,
        checkReturned: true,
        critical: 1,
        warning: 2,
        unknown: 3
      }
    });
  });

  it('handles a ICINGA_DATA_FAILURE action', () => {
    const time = new Date().toISOString();

    const state = icingaReducer(undefined, {
      type: ICINGA_DATA_FAILURE,
      time: time,
      environment: 'production',
    });

    expect(state).toMatchObject({
      production: {
        lastCheck: time,
        checkReturned: false
      }
    });
  });
});
