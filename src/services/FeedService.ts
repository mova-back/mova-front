/* eslint-disable */
import { call } from 'redux-saga/effects';
import { ApiRoute, wordUrlCreator } from '../constants/paths';
import { http } from './http.service';
import { AxiosResponse } from 'axios';
import Word from '../models/word';

export const FeedService = {
  *fetchFeed(offset: number, limit?: number, option?: string) {
    const params = new URLSearchParams();
    params.append('offset', offset.toString());
    if (limit !== undefined) {
      params.append('limit', limit.toString());
    }
    let response: AxiosResponse<Word[]>;
    switch (option) {
      case 'favourite':
        return (response = yield call(http(true).get, ApiRoute.FavouriteWords)).data;
      case 'my':
        return (response = yield call(http(true).get, ApiRoute.MyWords)).data;
      default: {
        response = yield call(http(false).get, wordUrlCreator());
        return response.data;
      }
    }
  },
};
