import { call } from 'redux-saga/effects';

import { ApiRoute, apiRoutesCreator } from '../constants/paths';
import { http } from './http.service';

const wordsService = {
  *createANewWord(word: any) {
    return yield call(http(true).post, ApiRoute.CreateAWord, word, {
      withCredentials: true,
    });
  },
  *likeAWord(id: string) {
    return yield call(
      http(true).put,
      apiRoutesCreator(ApiRoute.CreateAWord, id, 'like'),
      {},
      { withCredentials: true }
    );
  },
  *dislikeAWord(id: string) {
    return yield call(
      http(true).put,
      apiRoutesCreator(ApiRoute.CreateAWord, id, 'dislike'),
      {},
      { withCredentials: true }
    );
  },
};
export default wordsService;
