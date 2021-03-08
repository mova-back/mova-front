import { call } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { ApiRoute, apiRoutesCreator } from '../constants/paths';
import { http } from './http.service';

const wordsService = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  *createANewWord(word: {}) {
    const result: AxiosResponse<Record<string, unknown>> = yield call(
      http(true).post,
      ApiRoute.CreateAWord,
      word,
      {
        withCredentials: true,
      },
    );
    return result;
  },
  *likeAWord(id: string) {
    const result: AxiosResponse<Record<string, unknown>> = yield call(
      http(true).put,
      apiRoutesCreator(ApiRoute.CreateAWord, id, 'like'),
      {},
      { withCredentials: true },
    );
    return result;
  },
  *dislikeAWord(id: string) {
    const result: AxiosResponse<Record<string, unknown>> = yield call(
      http(true).put,
      apiRoutesCreator(ApiRoute.CreateAWord, id, 'dislike'),
      {},
      { withCredentials: true },
    );
    return result;
  },
};
export default wordsService;
