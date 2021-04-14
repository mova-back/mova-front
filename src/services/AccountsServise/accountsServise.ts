import { AxiosResponse } from 'axios';
import { call, StrictEffect } from 'redux-saga/effects';
import { IGetAccountsOptions } from '../../components/AccountsList/Types';
import { accountsUrlCreator, addIdToPath, ApiRoute } from '../../constants/paths';
import { http } from '../http.service';
import { Account, GetAccountsResponseType, GetAccountsReturnType } from './types';

const accountsServise = {
  *getAccounts(
    options: IGetAccountsOptions,
  ): Generator<StrictEffect, GetAccountsReturnType, AxiosResponse<GetAccountsResponseType>> {
    const response = yield call(http(true).get, accountsUrlCreator(options));
    return { data: response.data.data, totalCount: +response.headers['x-total-count'] };
  },
  *promoteUser(id: string): Generator<StrictEffect, any, any> {
    const response = yield call(
      http(true).put,
      addIdToPath(ApiRoute.Promote, id),
      {},
      { withCredentials: true },
    );
    return response.data;
  },
};

export default accountsServise;
