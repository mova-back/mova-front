import { call, StrictEffect } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { ApiRoute } from '../constants/paths';
import SignUpFormData from '../models/forms/signUpFormData';
import LoginData from '../models/forms/loginData';

import * as AuthService from './auth.service';
import { resetAuthData } from './auth.service';
import { http } from './http.service';
import User from '../models/user';
import { ChangePasswordDataType } from '../models/forms/changePasswordData';

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
    const response = yield call(http(false).post, ApiRoute.Registration, data);
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
  *confirmChangeEmail(
    query: string,
  ): Generator<StrictEffect, { message: string }, AxiosResponse<ConfirmRegistrationResponseType>> {
    const response = yield call(http(false).post, ApiRoute.ConfirmEmail, {
      emailConfirmToken: query,
    });
    return response.data.data;
  },
  *confirmResetPassword({
    password,
    resetPasswordToken,
  }: {
    password: string;
    resetPasswordToken: string;
  }): Generator<StrictEffect, void, unknown> {
    yield call(http(false).post, ApiRoute.ResetPassword, {
      resetPasswordToken,
      password,
    });
  },
  *resetPassword(email: string): Generator<StrictEffect, void, unknown> {
    yield call(http(false).post, ApiRoute.SendResetPasswordEmail, { email });
  },
  *changeEmail(newEmail: string): Generator<StrictEffect, void, unknown> {
    yield call(http(true).post, ApiRoute.ChangeEmail, { newEmail });
  },
  *signIn({ email, password }: LoginData): Generator<StrictEffect, User, any> {
    const response: AxiosResponse<SignInResponseType> = yield call(
      http(false).post,
      ApiRoute.UsersLogin,
      {
        email,
        password,
        fingerprint: yield call(AuthService.getFingerprint),
      },
      { withCredentials: true },
    );
    const { accessToken } = response.data.data;
    AuthService.setAuthData({
      accessToken,
      exp: AuthService.parseTokenData(accessToken).exp,
    });
    const user: User = yield call(UserService.getCurrent);
    return user;
  },

  *getCurrent(): Generator<StrictEffect, User, AxiosResponse<GetCurrentUserType>> {
    const response = yield call(http(true).get, ApiRoute.User, {}, { withCredentials: true });
    debugger;
    return response.data.data;
  },

  *signOut(): Generator<StrictEffect, void, unknown> {
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
  *changePassword(formData: ChangePasswordDataType) {
    const { oldPassword, newPassword } = formData;
    yield call(http(true).post, ApiRoute.ChangePassword, { oldPassword, newPassword });
  },
};
