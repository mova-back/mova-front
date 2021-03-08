/* eslint-disable */
import axios from 'axios';

import { AXIOS_TIMEOUT } from '../constants/utilConstants';

import { ApiRoute } from '../constants/paths';
import * as AuthService from './auth.service';

export function http(auth: boolean | undefined) {
  const instance = axios.create({
    baseURL: ApiRoute.Api,
    timeout: AXIOS_TIMEOUT,
    validateStatus: (status) => {
      return status >= 200 && status < 300;
    },
  });

  return init(auth, instance);
}

function init(isAuth: boolean | undefined, instance: any) {
  if (isAuth) {
    console.log('Auth route');
    instance.interceptors.request.use(
      (request: any) => {
        request.headers.authorization = AuthService.getAccessBearerToken();
        // if access token expired and refreshToken is exist >>>>>>> get new access token
        console.log('AuthService.isAccessTokenExpired()', AuthService.isAccessTokenExpired());
        console.log('AuthService.hasRefreshToken()', AuthService.hasRefreshToken());
        if (AuthService.isAccessTokenExpired() && AuthService.hasRefreshToken()) {
          return AuthService.debounceRefreshTokens()
            .then((response: any) => {
              console.log('response.data.accessToken', response.data.accessToken);
              AuthService.setAccessBearerToken(response.data.accessToken);
              request.headers.authorization = AuthService.getAccessBearerToken();
              return request;
            })
            .catch((error: any) => Promise.reject(error));
        }
        return request;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }

  return instance;
}
