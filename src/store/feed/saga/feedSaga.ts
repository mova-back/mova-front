/* eslint-disable */
import { call, put, takeLatest } from 'redux-saga/effects';
import { FeedService } from '../../../services/FeedService';
import { FETCH_FEED } from '../types';
import NotificationTypes from '../../../constants/notificationTypes';
import { feedActions } from '../reducer/feedReducer';
import { notificationActions } from '../../notification/reducer/notificationReducer';
import Word from '../../../models/word';
import { AxiosResponse } from 'axios';

export function* feed(action: any) {
  try {
    const { offset, limit } = action.payload;
    const words: AxiosResponse<Word[]> = yield call(FeedService.fetchFeed, offset, limit);
    yield put(feedActions.fetchFeedSuccess(words.data, offset));
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
    yield put(feedActions.fetchFeedError(e));
  }
}

const feedSagas = [takeLatest(FETCH_FEED, feed)];

export default feedSagas;
