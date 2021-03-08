import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';

export const history = createBrowserHistory();

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();
