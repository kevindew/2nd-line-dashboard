import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { requestData } from './actions';
import './index.css';
import Dashboard from './Dashboard';
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

const dispatchDataRequest = () => store.dispatch(requestData());

setInterval(dispatchDataRequest, 20000)
dispatchDataRequest();

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
