/* eslint-disable func-names */
import { all } from 'redux-saga/effects';
import userSagas from './user/saga/userSaga';
import notificationSagas from './notification/saga/notificationSaga';
import feedSagas from './feed/saga/feedSaga';
import { wordsSagas } from './words/wordsReducer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* () {
  yield all([...notificationSagas, ...userSagas, ...feedSagas, ...wordsSagas]);
}
