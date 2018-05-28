import {
  ICINGA_DATA_SUCCESS,
  ICINGA_DATA_FAILURE
} from '../actions/icinga'

const initialState = {
  ci: {},
  integration: {},
  production: {},
  staging: {}
};

export default function icingaReducer(state = initialState, action) {
  const envState = {}

  switch (action.type) {
    case ICINGA_DATA_SUCCESS:
      envState[action.environment] = {
        lastCheck: action.time,
        checkReturned: true,
        critical: action.critical,
        warning: action.warning,
        unknown: action.unknown
      }
      return { ...state, ...envState };

    case ICINGA_DATA_FAILURE:
      envState[action.environment] = {
        lastCheck: action.time,
        checkReturned: false
      }
      return { ...state, ...envState };

    default:
      return state;
  }
}
