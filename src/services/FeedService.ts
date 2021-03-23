/* eslint-disable */
import { call } from 'redux-saga/effects';
import { ApiRoute } from '../constants/paths';
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
    let response: Word[];
    switch (option) {
      case 'favourite':
        return (response = yield call(mockFavourites));
      case 'my':
        return (response = yield call(mockMy));
      default:
        return (response = yield call(http(false).get, ApiRoute.DictionaryFeed));
    }
  },
};

function mockMy() {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          data: [
            {
              updatedAt: '',
              id: '123',
              wordname: 'MyWord1',
              userId: '12344',
              meaning: 'MyWord1Meaning',
              extended_description: 'some description',
              createdAt: '',
              tags: ['TAG1', 'TAG2', 'TAG3'],
              likes: 15,
              dislikes: 2,
            },
            {
              updatedAt: '',
              id: '123',
              wordname: 'MyWord2',
              userId: '12344',
              meaning: 'MyWord2Meaning',
              extended_description: 'some description',
              createdAt: '',
              tags: ['TAG1', 'TAG2', 'TAG3'],
              likes: 15,
              dislikes: 2,
            },
          ],
        }),
      300,
    ),
  );
}
function mockFavourites() {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          data: [
            {
              updatedAt: '',
              id: '123',
              wordname: 'MyFavouriteWord1',
              userId: '12344',
              meaning: 'MyFavouriteWord1Meaning',
              extended_description: 'some description',
              createdAt: '',
              tags: ['TAG1', 'TAG2', 'TAG3'],
              likes: 15,
              dislikes: 2,
            },
            {
              updatedAt: '',
              id: '123',
              wordname: 'MyFavouriteWord2',
              userId: '12344',
              meaning: 'MyFavouriteWord2Meaning',
              extended_description: 'some description',
              createdAt: '',
              tags: ['TAG133', 'TAG244', 'TAG53'],
              likes: 15,
              dislikes: 2,
            },
          ],
        }),
      300,
    ),
  );
}
