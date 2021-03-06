/* eslint-disable */
import Word from '../../../models/word';
import HttpError from '../../../models/httpError';
import { FeedActionsTypes } from '../types';

const initialState: FeedStore = {
  feed: [],
  currentOffset: 0,
  fetching: false,
};

export const FETCH_FEED = 'FETCH_FEED';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_ERROR = 'FETCH_FEED_ERROR';
export const PURGE_FEED = 'PURGE_FEED';

export type FeedStore = {
  readonly feed: Word[];
  readonly currentOffset: number;
  readonly fetching: boolean;
};

const feedReducer = (
  state: FeedStore = initialState,
  action: FeedActionsTypes
): FeedStore => {
  switch (action.type) {
    case FETCH_FEED:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_FEED_SUCCESS:
      const { words, offset } = action.payload;

      return {
        ...state,
        feed: [...words],
        currentOffset: offset,
        fetching: false,
      };
    case FETCH_FEED_ERROR:
      return {
        ...state,
        fetching: false,
      };
    case PURGE_FEED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const feedActions = {
  purgeFeed: () =>
    ({
      type: PURGE_FEED,
      payload: {},
    } as const),
  fetchFeed: (offset: number, limit: number = 20) =>
    ({
      type: FETCH_FEED,
      payload: {
        offset,
        limit,
      },
    } as const),
  fetchFeedSuccess: (data: Word[], offset: number) => {
    console.log(data)
    return {
      type: FETCH_FEED_SUCCESS,
      payload: {
        words: data,
        offset,
      },
    } as const;
  },
  fetchFeedError: (error: HttpError) =>
    ({
      type: FETCH_FEED_ERROR,
      payload: error,
    } as const),
};

export default feedReducer;
