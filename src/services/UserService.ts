/* eslint-disable */
import { call } from 'redux-saga/effects';

import { ApiRoute } from '../constants/paths';
import SignUpFormData from '../models/forms/signUpFormData';
import LoginData from '../models/forms/loginData';

import * as AuthService from './auth.service';
import { http } from './http.service';
import { resetAuthData } from './auth.service';

export const UserService = {
  *register(data: SignUpFormData) {
    const response = yield call(http(false).post, ApiRoute.Users, data);
    return response.data.data;
  },

  *login({ email, password }: LoginData) {
    // getfingerprint
    const response = yield call(
      http(false).post,
      ApiRoute.UsersLogin,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    AuthService.setAuthData({
      accessToken: response.data.data.accessToken,
      exp: AuthService.parseTokenData(response.data.data.accessToken).exp,
    });
    return response.data.data;
  },

  *getCurrent() {
    const response = yield call(http(true).get, ApiRoute.User, {}, true);
    return response.data.data;
  },

  *logout() {
    try {
      // todo change to true (auth)
      yield call(
        http(true).post,
        ApiRoute.UsersLogout,
        {},
        { withCredentials: true }
      );
      resetAuthData();
      // router push login
      // return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  /*
  *login(data: LoginFormFields){
    const params = new URLSearchParams();
    params.append('username', data.email);
    params.append('password', data.password);
    params.append('grant_type','password');

    return yield call(ApiService.postSaga, TOKEN_URL, params, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      }
    });
  },

  refreshToken(refreshToken: string | null): Promise<LoginResp> {
    if (!refreshToken) {
      return Promise.reject();
    }

    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('grant_type', 'refresh_token');

    return ApiService.post(TOKEN_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      }
    });
  },

  *register(userData: any) {
    return yield call(ApiService.postSaga, USERS_URL, userData);
  },

  *requestPasswordReset(data: RequestPasswordResetFormFields) {
    return yield call(ApiService.postSaga, PASSWORD_RESET_URL, data);
  },

  *resetPassword(data: ChangePasswordFormFields, approveToken: string) {
    const params = new URLSearchParams();
    params.append('approve_token', approveToken);
    return yield call(ApiService.putSaga, PASSWORD_RESET_URL, { newPassword: data.password }, { params });
  },

  *emailApprove(approveToken: string) {
    const params = new URLSearchParams();
    params.append('approve_token', approveToken);
    return yield call(ApiService.postSaga, EMAIL_APPROVE_URL, null, { params });
  },

  *changePassword(data: ChangePasswordFormFields) {
    return yield call(ApiService.putSaga, CHANGE_PASSWORD_URL, { newPassword: data.password, oldPassword: data.oldPassword });
  },

  *deleteAccount() {
    return yield call(ApiService.deleteSaga, USERS_URL);
  },
  */
};
