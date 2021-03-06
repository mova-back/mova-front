/* eslint-disable import/no-cycle */
import Word from '../../models/word';

import { feedActions } from './reducer/feedReducer';
import { InferActionsTypes } from '../types';

export const FETCH_FEED = 'FETCH_FEED';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_ERROR = 'FETCH_FEED_ERROR';
export const PURGE_FEED = 'PURGE_FEED';

export type FeedActionsTypes = InferActionsTypes<typeof feedActions>;

export type FeedStore = {
  readonly feed: Word[];
  readonly currentOffset: number;
  readonly fetching: boolean;
};
