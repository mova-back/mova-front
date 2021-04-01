import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';
// eslint-disable-next-line import/no-cycle
import { init } from './init';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
export default function configureStore() {
  const middleware = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();

function* initSagas() {
  yield all([init(store)]);
}

sagaMiddleware.run(initSagas);
