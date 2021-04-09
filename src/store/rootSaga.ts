/* eslint-disable func-names */
import { all } from 'redux-saga/effects';
import { accountsSagas } from './accountsReducer';
import notificationSagas from './notification/saga/notificationSaga';
import { userSagas } from './user/reducer/userReducer';
import { wordsSagas } from './words/wordsReducer';

export default function* () {
  yield all([...notificationSagas, ...userSagas, ...wordsSagas, ...accountsSagas]);
}
