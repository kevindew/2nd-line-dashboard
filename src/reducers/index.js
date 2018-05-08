import { combineReducers } from 'redux'
import {
  ICINGA_DATA_SUCCESS,
  ICINGA_DATA_FAILURE
} from '../actions'

const initialIcingaState = {
  ci: {},
  integration: {},
  production: {},
  staging: {}
};

function icinga(state = initialIcingaState, action) {
  const envState = {}

  switch (action.type) {
    case ICINGA_DATA_SUCCESS:
      envState[action.environment] = {
        lastCheck: action.time,
        critical: action.critical,
        warning: action.warning,
        unknown: action.unknown
      }
      return { ...state, ...envState };

    case ICINGA_DATA_FAILURE:
      envState[action.environment] = {
        lastCheck: action.time
      }
      return { ...state, ...envState };

    default:
      return state;
  }
}

export default combineReducers({
  icinga
});
