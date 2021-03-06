import axios, { AxiosResponse } from 'axios';
import { ApiRoute } from '../constants/paths';

let BEARER_TOKEN = '';
let accessTokenExpDate = 0;

export function isAccessTokenExpired(): boolean {
  const updAccessTokenExpDate = accessTokenExpDate - 10;
  const nowTime = Math.floor(new Date().getTime() / 1000);
  return updAccessTokenExpDate <= nowTime;
}

export function parseTokenData(accessToken: string) {
  let payload = '';
  let tokenData = {
    exp: 0,
  };

  try {
    // eslint-disable-next-line prefer-destructuring
    payload = accessToken.split('.')[1];
    tokenData = JSON.parse(atob(payload));
  } catch (error) {
    throw new Error(error);
  }

  return tokenData;
}

export function setAccessBearerToken(accessToken: string): void {
  BEARER_TOKEN = `Bearer ${accessToken}`;
}

export function getAccessBearerToken(): string {
  return BEARER_TOKEN;
}

export function setRefreshToken(status: string) {
  if (!['', 'true'].includes(status)) {
    throw new Error(
      `setRefreshToken: invalid value ${status}; Expect one of ['', 'true']`
    );
  }

  localStorage.setItem('refreshToken', status);
}

export function hasRefreshToken(): boolean {
  return Boolean(localStorage.getItem('refreshToken'));
}

export function setAuthData(
  { accessToken, exp } = { accessToken: '', exp: 0 }
) {
  setRefreshToken('true');
  setAccessBearerToken(accessToken);
  accessTokenExpDate = exp;
}

export function resetAuthData() {
  accessTokenExpDate = 0;
  setRefreshToken('');
  setAccessBearerToken('');
}

// https://stackoverflow.com/questions/35228052/debounce-function-implemented-with-promises
export function debounce(inner: any, ms = 0) {
  let timer: any = null;
  let resolves: Array<any> = [];

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const result = inner();
      resolves.forEach((r) => r(result));
      resolves = [];
    }, ms);

    return new Promise((resolve) => resolves.push(resolve));
  };
}

type TokenData = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export async function refreshTokens() {
  try {
    const response: TokenData = await axios
      .post(
        ApiRoute.Refresh,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res: AxiosResponse<TokenData>) => res.data);
    setAuthData({
      accessToken: response.data.accessToken,
      exp: parseTokenData(response.data.accessToken).exp,
    });
    return response.data;
  } catch (error) {
    resetAuthData();
    // router push '/login'
    throw new Error(error);
  }
}

export const debounceRefreshTokens = debounce(() => {
  return refreshTokens();
}, 100);
