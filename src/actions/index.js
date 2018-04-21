import axios from 'axios';

function icignaUrl(environment) {
  const buildUrl = hostname => {
    return `https://${hostname}/cgi-bin/icinga/status.cgi?servicestatustypes=28&jsonoutput=1`;
  }

  switch (environment) {
    case "ci":
      return buildUrl("ci-alert.integration.publishing.service.gov.uk");
    case "integration":
      return buildUrl("alert.integration.publishing.service.gov.uk");
    case "production":
      return buildUrl("alert.publishing.service.gov.uk");
    case "staging":
      return buildUrl("alert.staging.publishing.service.gov.uk");
    default:
      throw new Error(`Unknown Icinga environment: ${environment}`);
  }
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

export const ICINGA_DATA_SUCCESS = 'ICINGA_DATA_SUCCESS';
function icingaDataSuccess(environment, data) {
  return {
    type: ICINGA_DATA_SUCCESS
  };
}

export const ICINGA_DATA_FAILURE = 'ICINGA_DATA_FAILURE';
function icingaDataFailure(environment) {
  return {
    type: ICINGA_DATA_FAILURE
  };
}

export function requestData() {
  return dispatch => {
    dispatch(checkIcinga("production"));
    dispatch(checkIcinga("staging"));
    dispatch(checkIcinga("integration"));
    dispatch(checkIcinga("ci"));
  }
}
