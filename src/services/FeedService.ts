/* eslint-disable */
import { call, StrictEffect } from 'redux-saga/effects';
import { ApiRoute, FeedUrlOptionsType, wordUrlCreator } from '../constants/paths';
import { http } from './http.service';
import { AxiosResponse } from 'axios';
import Word from '../models/word';
export interface FeedReturnType {
  feed: Word[];
  totalCount: string;
}
export const FeedService = {
  *fetchFeed(
    options: FeedUrlOptionsType,
  ): Generator<StrictEffect, FeedReturnType, AxiosResponse<{ data: Word[]; success: boolean }>> {
    const response = yield call(http(true).get, wordUrlCreator(options));
    const result = { feed: response.data.data, totalCount: response.headers['x-total-count'] };
    return result;
  },
};
