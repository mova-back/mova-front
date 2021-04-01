/* eslint-disable func-names */
import { all, takeEvery } from 'redux-saga/effects';
import notificationSagas from './notification/saga/notificationSaga';
import { userSagas } from './user/reducer/userReducer';
import { wordsSagas } from './words/wordsReducer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* () {
  yield all([...notificationSagas, ...userSagas, ...wordsSagas]);
}
