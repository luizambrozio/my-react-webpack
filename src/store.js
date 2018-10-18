import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './redux/reducer';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

const middleware = applyMiddleware(...middlewares);

const store = createStore(reducer, middleware);

if (module.hot) {
  module.hot.accept('./redux/reducer', () =>
    store.replaceReducer(require('./redux/reducer').default)
  );
}

export default store;
