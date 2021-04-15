/* eslint-disable */
import { call, StrictEffect } from 'redux-saga/effects';
import {
  ApiRoute,
  FeedUrlOptionsType,
  ModeratorFeedUrlOptionsType,
  moderatorWordUrlCreator,
  wordUrlCreator,
} from '../constants/paths';
import { http } from './http.service';
import { AxiosResponse } from 'axios';
import Word from '../models/word';
export interface FeedReturnType {
  feed: Word[];
  totalCount: string;
}

export interface ModeratorFeedReturnType {
  feed: WordWithComplaints[];
  totalCount: string;
}
export interface Complaint {
  _id: string;
  message: string;
  createdByUserId: string;
  wordId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WordWithComplaints extends Word {
  complaints: Complaint[];
}
export const FeedService = {
  *fetchFeed(
    options: FeedUrlOptionsType,
  ): Generator<StrictEffect, FeedReturnType, AxiosResponse<{ data: Word[]; success: boolean }>> {
    const response = yield call(http(false).get, wordUrlCreator(options));
    const result = { feed: response.data.data, totalCount: response.headers['x-total-count'] };
    return result;
  },
  *fetchModeratorFeed(
    options: ModeratorFeedUrlOptionsType,
  ): Generator<
    StrictEffect,
    ModeratorFeedReturnType,
    AxiosResponse<{ data: WordWithComplaints[]; success: boolean }>
  > {
    const response = yield call(http(true).get, moderatorWordUrlCreator(options));
    debugger;
    const result = { feed: response.data.data, totalCount: response.headers['x-total-count'] };
    return result;
  },
};
