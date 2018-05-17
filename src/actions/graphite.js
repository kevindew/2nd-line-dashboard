import axios from 'axios';

const GRAPHITE_URL = new URL('https://graphite.publishing.service.gov.uk/render/?format=json');

const CDN_MONITORING_KEY = 'monitoring-*_management.cdn_fastly-{assets,govuk,redirector}';

function dataPointsAverage(dataPoints) {
  const total = dataPoints.reduce((total, item) => total + item[0], 0)
  return total / dataPoints.length;
}

function lastDataPoint(dataPoints) {
  return dataPoints[dataPoints.length - 1][0];
}

function cdnRequestsTarget() {
  const base = CDN_MONITORING_KEY + '.requests-requests';
  return `timeShift(sumSeries(${base}), '-15mins')`;
}

function cdn4xxResponsesTarget() {
  const response4xx = `sumSeries(${CDN_MONITORING_KEY}.requests-status_4xx)`;
  const responseAny = `sumSeries(${CDN_MONITORING_KEY}.requests-status_?xx)`;
  const responseDivision = `divideSeries(${response4xx}, ${responseAny})`;
  return `timeShift(asPercent(${responseDivision}, 1), '-15mins')`;
}

function cdn5xxResponsesTarget() {
  const response5xx = `sumSeries(${CDN_MONITORING_KEY}.requests-status_5xx)`;
  const responseAny = `sumSeries(${CDN_MONITORING_KEY}.requests-status_?xx)`;
  const responseDivision = `divideSeries(${response5xx}, ${responseAny})`;
  return `timeShift(asPercent(${responseDivision}, 1), '-15mins')`;
}

function originRequestsTarget() {
  return 'sumSeries(cache-*.nginx.nginx_requests)';
}

function origin429ResponsesTarget() {
  const response429 = 'sumSeries(stats.cache-*.nginx_logs.www-origin.http_429)';
  const responseAny = 'sumSeries(stats.cache-*.nginx_logs.www-origin.http_*xx)';
  const responseDivision = `divideSeries(${response429}, ${responseAny})`;
  return `asPercent(${responseDivision}, 1)`;
}

function originOther4xxResponsesTarget() {
  const response4xx = 'sumSeries(stats.cache-*.nginx_logs.www-origin.http_4xx)';
  const response429 = 'sumSeries(stats.cache-*.nginx_logs.www-origin.http_429)';
  const other4xx = `diffSeries(${response4xx}, ${response429})`;
  const responseAny = 'sumSeries(stats.cache-*.nginx_logs.www-origin.http_*xx)';
  const responseDivision = `divideSeries(${other4xx}, ${responseAny})`;
  return `asPercent(${responseDivision}, 1)`;
}

function origin5xxResponsesTarget() {
  const response5xx = 'sumSeries(stats.cache-*.nginx_logs.www-origin.http_5xx)';
  const responseAny = 'sumSeries(stats.cache-*.nginx_logs.www-origin.http_*xx)';
  const responseDivision = `divideSeries(${response5xx}, ${responseAny})`;
  return `asPercent(${responseDivision}, 1)`;
}

function sentryErrorsTarget() {
  return 'sumSeries(keepLastValue(stats.gauges.sentry-error-count-last-hour.*))';
}

function graphite5minsUrl() {
  const url = new URL(GRAPHITE_URL);
  const searchParams = url.searchParams;

  // note the order of these is important to working out the returned data
  // see graphite5minData function
  searchParams.append('target', cdnRequestsTarget());
  searchParams.append('target', cdn4xxResponsesTarget());
  searchParams.append('target', cdn5xxResponsesTarget());
  searchParams.append('target', originRequestsTarget());
  searchParams.append('target', origin429ResponsesTarget());
  searchParams.append('target', originOther4xxResponsesTarget());
  searchParams.append('target', origin5xxResponsesTarget());
  searchParams.append('target', sentryErrorsTarget());

  searchParams.append('from', '-5mins');

  return url
}

function graphite30minsUrl() {
  const url = new URL(GRAPHITE_URL);
  const searchParams = url.searchParams;

  searchParams.append('target', sentryErrorsTarget());
  searchParams.append('from', '-30mins');

  return url
}

function checkGraphite5mins() {
  return dispatch => {
    return axios({ url: graphite5minsUrl(), timeout: 6000 })
      .then(
        response => dispatch(graphite5minsSuccess(response.data)),
        error => dispatch(graphite5minsFailure())
      )
  }
}

function checkGraphite30mins() {
  return dispatch => {
    return axios({ url: graphite30minsUrl(), timeout: 6000 })
      .then(
        response => dispatch(graphite30minsSuccess(response.data)),
        error => dispatch(graphite30minsFailure())
      )
  }
}

function graphite5minsData(data) {
  return {
    cdnRequestsPerSecond: dataPointsAverage(data[0].datapoints),
    cdn4xxResponsePercentage: dataPointsAverage(data[1].datapoints),
    cdn5xxResponsePercentage: dataPointsAverage(data[2].datapoints),
    originRequestsPerSecond: dataPointsAverage(data[3].datapoints),
    origin429ResponsePercentage: dataPointsAverage(data[4].datapoints),
    originOther4xxResponsePercentage: dataPointsAverage(data[5].datapoints),
    origin5xxResponsePercentage: dataPointsAverage(data[6].datapoints)
  }
}

export const GRAPHITE_5MINS_SUCCESS = 'GRAPHITE_5MINS_SUCCESS';
function graphite5minsSuccess(data) {
  return {
    type: GRAPHITE_5MINS_SUCCESS,
    time: new Date().toISOString(),
    ...graphite5minsData(data)
  };
}

export const GRAPHITE_5MINS_FAILURE = 'GRAPHITE_5MINS_FAILURE';
function graphite5minsFailure(environment) {
  return {
    type: GRAPHITE_5MINS_FAILURE,
    time: new Date().toISOString()
  };
}

export const GRAPHITE_30MINS_SUCCESS = 'GRAPHITE_30MINS_SUCCESS';
function graphite30minsSuccess(data) {
  return {
    type: GRAPHITE_30MINS_SUCCESS,
    time: new Date().toISOString(),
    sentryErrorsLastHour: lastDataPoint(data[0].datapoints)
  };
}

export const GRAPHITE_30MINS_FAILURE = 'GRAPHITE_30MINS_FAILURE';
function graphite30minsFailure(environment) {
  return {
    type: GRAPHITE_30MINS_FAILURE,
    time: new Date().toISOString()
  };
}

export function requestGraphiteData() {
  return dispatch => {
    dispatch(checkGraphite5mins());
    dispatch(checkGraphite30mins());
  }
}
