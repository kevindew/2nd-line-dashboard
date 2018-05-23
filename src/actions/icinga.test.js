import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  requestIcingaData,
  ICINGA_DATA_SUCCESS,
  ICINGA_DATA_FAILURE
} from './icinga';
import moxios from 'moxios';

const mockStore = configureMockStore([thunkMiddleware]);

function mockIcingaResponse(serviceStatuses) {
  return {
    cgi_json_version: '1.1.0',
    icinga_status: {},
    status: {
      service_status: serviceStatuses
    }
  };
}

beforeEach(() => moxios.install());
afterEach(() => moxios.uninstall());

describe('requestIcingaData action', () => {
  it('creates a ICINGA_DATA_SUCCESS action for each success', () => {
    const store = mockStore({});
    moxios.stubRequest(
      /alert.publishing/,
      {
        status: 200,
        response: mockIcingaResponse([{ status: 'CRITICAL' }])
      }
    );
    moxios.stubRequest(
      /ci-alert.integration.publishing/,
      {
        status: 200,
        response: mockIcingaResponse([{ status: 'UNKNOWN' }])
      }
    );
    moxios.stubRequest(
      /alert.integration.publishing/,
      {
        status: 200,
        response: mockIcingaResponse([{ status: 'WARNING' }])
      }
    );
    moxios.stubRequest(
      /alert.staging.publishing/,
      {
        status: 200,
        response: mockIcingaResponse([])
      }
    );

    return store.dispatch(requestIcingaData()).then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: ICINGA_DATA_SUCCESS,
            environment: 'production',
            critical: 1
          }),
          expect.objectContaining({
            type: ICINGA_DATA_SUCCESS,
            environment: 'ci',
            unknown: 1
          }),
          expect.objectContaining({
            type: ICINGA_DATA_SUCCESS,
            environment: 'integration',
            warning: 1
          }),
          expect.objectContaining({
            type: ICINGA_DATA_SUCCESS,
            environment: 'staging',
          })
        ])
      );
    });
  });

  it('creates a ICINGA_DATA_FAILURE action on failure', () => {
    const store = mockStore({});
    moxios.stubRequest(/./, { status: 500 })

    return store.dispatch(requestIcingaData()).then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: ICINGA_DATA_FAILURE,
            environment: 'production'
          }),
          expect.objectContaining({
            type: ICINGA_DATA_FAILURE,
            environment: 'ci'
          }),
          expect.objectContaining({
            type: ICINGA_DATA_FAILURE,
            environment: 'integration'
          }),
          expect.objectContaining({
            type: ICINGA_DATA_FAILURE,
            environment: 'staging'
          })
        ])
      );
    });
  });
});
