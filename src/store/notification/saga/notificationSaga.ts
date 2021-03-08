/* eslint-disable */
import { take, actionChannel, call, put, fork, race, delay } from 'redux-saga/effects';

import { AddNotificationAction } from '../types';

import NotificationConfig from '../../../models/notification';
import {
  ADD_NOTIFICATION,
  DISMISS_NOTIFICATION,
  notificationActions,
  REMOVE_NOTIFICATION,
} from '../reducer/notificationReducer';

export function* watchForNotifications() {
  const notificationChannel: string = yield actionChannel(ADD_NOTIFICATION);
  while (true) {
    const { payload } = (yield take(notificationChannel)) as AddNotificationAction;
    yield call(displayNotification, payload);
  }
}

export function* displayNotification(notification: NotificationConfig) {
  yield put(notificationActions.showNotification(notification));
  yield race({
    dismissed: take(DISMISS_NOTIFICATION),
    timeout: delay(5000),
  });
  yield put(notificationActions.hideNotification());
  yield take(REMOVE_NOTIFICATION);
}

const notificationSagas = [fork(watchForNotifications)];

export default notificationSagas;
