import { call, StrictEffect } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { ApiRoute } from '../constants/paths';
import SignUpFormData from '../models/forms/signUpFormData';
import LoginData from '../models/forms/loginData';

import * as AuthService from './auth.service';
import { resetAuthData } from './auth.service';
import { http } from './http.service';
import User from '../models/user';

type ConfirmRegistrationResponseType = {
  data: {
    message: string;
  };
};

type SignInResponseType = {
  success: boolean;
  data: SignInResponseDataType;
};
export type SignInResponseDataType = {
  accessToken: string;
  refreshToken: string;
};
type GetCurrentUserType = {
  data: User;
};

export const UserService = {
  *signUp(
    data: SignUpFormData,
  ): Generator<StrictEffect, SignInResponseDataType, AxiosResponse<SignInResponseType>> {
    const response = yield call(http(false).post, ApiRoute.User, data);
    return response.data.data;
  },
  *confirmRegistration(
    query: string,
  ): Generator<StrictEffect, { message: string }, AxiosResponse<ConfirmRegistrationResponseType>> {
    const response = yield call(http(false).post, ApiRoute.ConfirmRegistration, {
      emailConfirmToken: query,
    });
    return response.data.data;
  },

  *signIn({ email, password }: LoginData): Generator<StrictEffect, User, any> {
    const response: AxiosResponse<SignInResponseType> = yield call(
      http(false).post,
      ApiRoute.UsersLogin,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    const { accessToken, refreshToken } = response.data.data;
    AuthService.setAuthData({
      accessToken,
      exp: AuthService.parseTokenData(refreshToken).exp,
    });
    const user: User = yield call(this.getCurrent);
    return user;
  },

  *getCurrent(): Generator<StrictEffect, User, AxiosResponse<GetCurrentUserType>> {
    const response = yield call(http(true).get, ApiRoute.User, {}, true);
    return response.data.data;
  },

  *logout(): Generator<StrictEffect, void, unknown> {
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
