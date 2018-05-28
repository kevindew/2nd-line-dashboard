import {
  GRAPHITE_5MINS_SUCCESS,
  GRAPHITE_5MINS_FAILURE,
  GRAPHITE_30MINS_SUCCESS,
  GRAPHITE_30MINS_FAILURE
} from '../actions/graphite'

const initialState = {
  last5mins: {},
  last30mins: {}
}

export default function graphiteReducer(state = initialState, action) {
  switch (action.type) {
    case GRAPHITE_5MINS_SUCCESS:
      return {
        ...state,
        last5mins: {
          lastCheck: action.time,
          checkReturned: true,
          cdnRequestsPerSecond: action.cdnRequestsPerSecond,
          cdn4xxResponsePercentage: action.cdn4xxResponsePercentage,
          cdn5xxResponsePercentage: action.cdn5xxResponsePercentage,
          originRequestsPerSecond: action.originRequestsPerSecond,
          origin429ResponsePercentage: action.origin429ResponsePercentage,
          originOther4xxResponsePercentage: action.originOther4xxResponsePercentage,
          origin5xxResponsePercentage: action.origin5xxResponsePercentage
        }
      };
    case GRAPHITE_5MINS_FAILURE:
      return {
        ...state,
        last5mins: {
          lastCheck: action.time,
          checkReturned: false,
        }
      };
    case GRAPHITE_30MINS_SUCCESS:
      return {
        ...state,
        last30mins: {
          lastCheck: action.time,
          checkReturned: true,
          sentryErrorsLastHour: action.sentryErrorsLastHour
        }
      };
    case GRAPHITE_30MINS_FAILURE:
      return {
        ...state,
        last30mins: {
          lastCheck: action.time,
          checkReturned: false,
        }
      };
    default:
      return state;
  }
}
