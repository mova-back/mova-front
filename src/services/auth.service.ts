import axios, { AxiosResponse } from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { ApiRoute, Page } from '../constants/paths';

let BEARER_TOKEN = '';
let accessTokenExpDate = 0;

type TokenData = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export function isAccessTokenExpired(): boolean {
  const updAccessTokenExpDate = accessTokenExpDate - 10;
  const nowTime = Math.floor(new Date().getTime() / 1000);
  return updAccessTokenExpDate <= nowTime;
}

export function parseTokenData(accessToken: string): { exp: number } {
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

export function setRefreshToken(status: string): void {
  if (!['', 'true'].includes(status)) {
    throw new Error(`setRefreshToken: invalid value ${status}; Expect one of ['', 'true']`);
  }

  localStorage.setItem('refreshToken', status);
}

export function hasRefreshToken(): boolean {
  return Boolean(localStorage.getItem('refreshToken'));
}

export function setAuthData(
  { accessToken, exp } = {
    accessToken: '',
    exp: 0,
  },
): void {
  setRefreshToken('true');
  setAccessBearerToken(accessToken);
  accessTokenExpDate = exp;
}

export function resetAuthData(): void {
  accessTokenExpDate = 0;
  setRefreshToken('');
  setAccessBearerToken('');
}

export function debounce(inner: () => Promise<unknown>, ms = 0): () => Promise<unknown> {
  let timer: ReturnType<typeof setTimeout>;
  let resolves: Array<(value?: unknown) => void> = [];

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

export async function getFingerprint(): Promise<string> {
  const fp = await FingerprintJS.load();

  const result = await fp.get({ debug: true });
  const { visitorId } = result;
  console.log('fingerprint: ', visitorId);
  return visitorId;
}

export async function refreshTokens(): Promise<Record<string, string>> {
  try {
    const response: TokenData = await axios
      .post(
        ApiRoute.Refresh,
        { fingerprint: await getFingerprint() },
        {
          withCredentials: true,
        },
      )
      .then((res: AxiosResponse<TokenData>) => res.data);
    setAuthData({
      accessToken: response.data.accessToken,
      exp: parseTokenData(response.data.accessToken).exp,
    });
    return response.data;
  } catch (error) {
    resetAuthData();
    throw new Error(error);
  }
}

export const debounceRefreshTokens = debounce((history?: ReturnType<typeof useHistory>) => {
  return refreshTokens();
}, 100);
