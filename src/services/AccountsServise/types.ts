import User from '../../models/user';

export type GetAccountsResponseType = {
  data: Account[];
};

export type GetAccountsReturnType = {
  data: Account[];
  totalCount: number;
};
export type Account = Omit<User, 'accessToken' | 'refreshToken'>;
