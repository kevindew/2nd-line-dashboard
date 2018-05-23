import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  requestGraphiteData,
  GRAPHITE_5MINS_SUCCESS,
  GRAPHITE_5MINS_FAILURE,
  GRAPHITE_30MINS_SUCCESS,
  GRAPHITE_30MINS_FAILURE
} from './graphite';
import moxios from 'moxios';

const mockStore = configureMockStore([thunkMiddleware]);

function mockGraphite5minResponse() {
  return [
    { datapoints: [ [100, 1527107820] ] },
    { datapoints: [ [101, 1527107820] ] },
    { datapoints: [ [102, 1527107820] ] },
    { datapoints: [ [103, 1527107820] ] },
    { datapoints: [ [104, 1527107820] ] },
    { datapoints: [ [105, 1527107820] ] },
    { datapoints: [ [106, 1527107820] ] },
  ];
}

function mockGraphite30minResponse() {
  return [{ datapoints: [ [200, 1527107820] ] }];
}

beforeEach(() => moxios.install());
afterEach(() => moxios.uninstall());

describe('requestGraphiteData action', () => {
  it('creates GRAPHITE_5MINS_SUCCESS and GRAPHITE_30MINS_SUCCESS for a successful action', () => {
    const store = mockStore({});
    moxios.stubRequest(
      /from=-5mins/,
      { status: 200, response: mockGraphite5minResponse() }
    );
    moxios.stubRequest(
      /from=-30mins/,
      { status: 200, response: mockGraphite30minResponse() }
    );

    return store.dispatch(requestGraphiteData()).then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: GRAPHITE_5MINS_SUCCESS,
            cdnRequestsPerSecond: 100,
            cdn4xxResponsePercentage: 101,
            cdn5xxResponsePercentage: 102,
            originRequestsPerSecond: 103,
            origin429ResponsePercentage: 104,
            originOther4xxResponsePercentage: 105,
            origin5xxResponsePercentage: 106
          }),
          expect.objectContaining({
            type: GRAPHITE_30MINS_SUCCESS,
            sentryErrorsLastHour: 200
          })
        ])
      );
    });
  });

  it('creates GRAPHITE_5MINS_FAILURE and GRAPHITE_30MINS_FAILURE for a failed action', () => {
    const store = mockStore({});
    moxios.stubRequest(/./, { status: 500 })

    return store.dispatch(requestGraphiteData()).then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: GRAPHITE_5MINS_FAILURE }),
          expect.objectContaining({ type: GRAPHITE_30MINS_FAILURE })
        ])
      );
    });
  });
});
