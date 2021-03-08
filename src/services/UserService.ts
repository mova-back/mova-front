/* eslint-disable */
import { call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

import { ApiRoute } from '../constants/paths';
import SignUpFormData from '../models/forms/signUpFormData';
import LoginData from '../models/forms/loginData';

import * as AuthService from './auth.service';
import { resetAuthData } from './auth.service';
import { http } from './http.service';
import { AxiosResponse } from 'axios';

type LoginResponse = {
  data: {
    accessToken: string;
    createdAt: string;
    email: string;
    id: string;
    refreshToken: string;
    updatedAt: string;
    username: string;
  };
};

export const UserService = {
  *register(data: SignUpFormData): SagaIterator<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = yield call(
      http(false).post,
      ApiRoute.Users,
      data,
    );
    return response.data;
  },

  *login({ email, password }: LoginData) {
    // getfingerprint
    const response: AxiosResponse<LoginResponse> = yield call(
      http(false).post,
      ApiRoute.UsersLogin,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    AuthService.setAuthData({
      accessToken: response.data.data.accessToken,
      exp: AuthService.parseTokenData(response.data.data.accessToken).exp,
    });
    return response.data.data;
  },

  *getCurrent() {
    const response: AxiosResponse<LoginResponse> = yield call(
      http(true).get,
      ApiRoute.User,
      {},
      true,
    );
    return response.data.data;
  },

  *logout() {
    try {
      // todo change to true (auth)
      yield call(http(true).post, ApiRoute.UsersLogout, {}, { withCredentials: true });
      resetAuthData();
      // router push login
      // return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
