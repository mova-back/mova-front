/* eslint-disable */
import { call, StrictEffect } from 'redux-saga/effects';
import { ApiRoute, FeedUrlOptionsType, wordUrlCreator } from '../constants/paths';
import { http } from './http.service';
import { AxiosResponse } from 'axios';
import Word from '../models/word';

export const FeedService = {
  *fetchFeed(options: FeedUrlOptionsType): Generator<StrictEffect, Word[], AxiosResponse<Word[]>> {
    debugger;
    const response = yield call(http(false).get, wordUrlCreator(options));
    return response.data;
  },
};
