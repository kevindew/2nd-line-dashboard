import axios from 'axios';

export function icingaHostname(environment) {
  switch (environment) {
    case "ci":
      return "ci-alert.integration.publishing.service.gov.uk";
    case "integration":
      return "alert.integration.publishing.service.gov.uk";
    case "production":
      return "alert.publishing.service.gov.uk";
    case "staging":
      return "alert.staging.publishing.service.gov.uk";
    default:
      throw new Error(`Unknown Icinga environment: ${environment}`);
  }
}

function icignaUrl(environment) {
  const hostname = icingaHostname(environment);
  return `https://${hostname}/cgi-bin/icinga/status.cgi?servicestatustypes=28&jsonoutput=1`;
}

function checkIcinga(environment) {
  return dispatch => {
    return axios({ url: icignaUrl(environment), timeout: 3000 })
      .then(
        response => dispatch(icingaDataSuccess(environment, response.data)),
        error => dispatch(icingaDataFailure(environment))
      )
  }
}

function countIssues(data) {
  const activeServices = data.status.service_status.filter(status => {
    return !status.has_been_acknowledged && !status.in_scheduled_downtime;
  });

  return {
    critical: activeServices.filter(s => s.status === "CRITICAL").length,
    warning: activeServices.filter(s => s.status === "WARNING").length,
    unknown: activeServices.filter(s => s.status === "UNKNOWN").length,
  }
}

export const ICINGA_DATA_SUCCESS = 'ICINGA_DATA_SUCCESS';
function icingaDataSuccess(environment, data) {
  return {
    type: ICINGA_DATA_SUCCESS,
    environment: environment,
    time: Date.now(),
    ...countIssues(data)
  };
}

export const ICINGA_DATA_FAILURE = 'ICINGA_DATA_FAILURE';
function icingaDataFailure(environment) {
  return {
    type: ICINGA_DATA_FAILURE,
    environment: environment,
    time: Date.now()
  };
}

export function requestIcingaData() {
  return dispatch => {
    dispatch(checkIcinga("production"));
    dispatch(checkIcinga("staging"));
    dispatch(checkIcinga("integration"));
    dispatch(checkIcinga("ci"));
  }
}
