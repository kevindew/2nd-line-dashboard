import { combineReducers } from 'redux'
import graphite from './graphite';
import icinga from './icinga';

export default combineReducers({ icinga, graphite });
