import { AxiosResponse } from 'axios';
import { call, StrictEffect } from 'redux-saga/effects';
import { addIdToPath, ApiRoute } from '../constants/paths';
import User from '../models/user';
import { http } from './http.service';

type Response = {
  data: Account[];
};
export type Account = Omit<User, 'accessToken' | 'refreshToken'>;
const accountsServise = {
  *getAccounts(): Generator<StrictEffect, Account[], AxiosResponse<Response>> {
    const response = yield call(http(true).get, ApiRoute.Accounts);
    return response.data.data;
  },
  *promoteUser(id: string): Generator<StrictEffect, any, any> {
    const response = yield call(http(true).post, addIdToPath(ApiRoute.Promote, id));
    return response.data;
  },
};

export default accountsServise;
