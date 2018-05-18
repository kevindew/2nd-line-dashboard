import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { requestIcingaData } from './actions/icinga';
import { requestGraphiteData } from './actions/graphite';
import Dashboard from './components/Dashboard';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

setInterval(() => store.dispatch(requestIcingaData()), 20000)
setInterval(() => store.dispatch(requestGraphiteData()), 60000)

store.dispatch(requestIcingaData());
store.dispatch(requestGraphiteData());

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
