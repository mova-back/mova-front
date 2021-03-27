import { call, StrictEffect } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { ApiRoute, rateAWordRouteCreator } from '../constants/paths';
import { http } from './http.service';
import Word from '../models/word';

type CreateWordResponse = {
  data: Word;
};

export type RateAWordResponseType = {
  success: boolean;
  message: string;
};

type NewWordWithTags = {
  swearing: boolean;
  usages: string;
  tags: string[];
  helperText?: string;
  wordname: string;
  meaning: string;
  extended_description: string;
};

const wordsService = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  *createANewWord(word: NewWordWithTags) {
    // eslint-disable-next-line no-debugger
    debugger;
    const result: AxiosResponse<CreateWordResponse> = yield call(
      http(true).post,
      ApiRoute.CreateAWord,
      word,
      {
        withCredentials: true,
      },
    );
    return result.data.data;
  },
  *rateAWord(
    route: ApiRoute.LikeAWord | ApiRoute.DislikeAWord | ApiRoute.RemoveLike,
    id: string,
  ): Generator<StrictEffect, RateAWordResponseType, AxiosResponse<RateAWordResponseType>> {
    const result = yield call(
      http(true).put,
      rateAWordRouteCreator(route, id),
      {},
      { withCredentials: true },
    );
    return result.data;
  },
  *addFavourite(
    id: string,
  ): Generator<StrictEffect, RateAWordResponseType, AxiosResponse<RateAWordResponseType>> {
    const result = yield call(
      http(true).put,
      rateAWordRouteCreator(ApiRoute.AddFavourite, id),
      {},
      { withCredentials: true },
    );
    return result.data;
  },
  *removeFavourite(
    id: string,
  ): Generator<StrictEffect, RateAWordResponseType, AxiosResponse<RateAWordResponseType>> {
    const result = yield call(
      http(true).put,
      rateAWordRouteCreator(ApiRoute.RemoveFavourite, id),
      {},
      { withCredentials: true },
    );
    return result.data;
  },
  *deleteWord(
    id: string,
  ): Generator<StrictEffect, RateAWordResponseType, AxiosResponse<RateAWordResponseType>> {
    const result = yield call(
      http(true).delete,
      rateAWordRouteCreator(ApiRoute.DeleteWord, id),
      {},
      { withCredentials: true },
    );
    return result.data;
  },
};
export default wordsService;
