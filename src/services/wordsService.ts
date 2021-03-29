import { call, StrictEffect } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { ApiRoute, addIdToPath } from '../constants/paths';
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
  *createANewWord(
    word: NewWordWithTags,
  ): Generator<StrictEffect, CreateWordResponse, AxiosResponse<CreateWordResponse>> {
    const result = yield call(http(true).post, ApiRoute.CreateAWord, word, {
      withCredentials: true,
    });
    return result.data;
  },
  *changeWord(
    word: NewWordWithTags,
    id: string,
  ): Generator<StrictEffect, CreateWordResponse, AxiosResponse<CreateWordResponse>> {
    const result = yield call(http(true).patch, addIdToPath(ApiRoute.CreateAWord, id), word, {
      withCredentials: true,
    });
    return result.data;
  },
  *rateAWord(
    route: ApiRoute.LikeAWord | ApiRoute.DislikeAWord | ApiRoute.RemoveLike,
    id: string,
  ): Generator<StrictEffect, RateAWordResponseType, AxiosResponse<RateAWordResponseType>> {
    const result = yield call(
      http(true).put,
      addIdToPath(route, id),
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
      addIdToPath(ApiRoute.AddFavourite, id),
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
      addIdToPath(ApiRoute.RemoveFavourite, id),
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
      addIdToPath(ApiRoute.DeleteWord, id),
      {},
      { withCredentials: true },
    );
    return result.data;
  },
};
export default wordsService;
