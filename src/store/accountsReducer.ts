// eslint-disable-next-line import/no-extraneous-dependencies
import { StrictEffect, takeEvery, call, put } from '@redux-saga/core/effects';
import { IGetAccountsOptions } from '../components/AccountsList/Types';
import NotificationTypes from '../constants/notificationTypes';
import { accountsUrlCreator } from '../constants/paths';
import accountsServise from '../services/AccountsServise/accountsServise';

import { Account, GetAccountsReturnType } from '../services/AccountsServise/types';
import { notificationActions } from './notification/reducer/notificationReducer';
import { InferActionsTypes } from './types';

const GET_ACCOUNTS = 'accountsReducer/GET_ACCOUNTS';
const GET_ACCOUNTS_SUCCESS = 'accountsReducer/GET_ACCOUNTS_SUCCESS';
const PROMOTE_USER = 'accountsReducer/PROMOTE_USER';
const PROMOTE_USER_SUCCESS = 'accountsReducer/PROMOTE_USER_SUCCESS';

type AccountsReducerStateType = {
  accounts: Account[];
  fetching: boolean;
  totalCount: number;
};

const initialState = {
  accounts: [],
  fetching: false,
  totalCount: 0,
};

type AccountsActionsType = InferActionsTypes<typeof accountsActions>;
const accountsReducer = (
  state: AccountsReducerStateType = initialState,
  action: AccountsActionsType,
) => {
  switch (action.type) {
    case GET_ACCOUNTS: {
      const { page } = action.payload.options;
      return {
        ...state,
        fetching: page === 0 ? !state.fetching : false,
      };
    }
    case GET_ACCOUNTS_SUCCESS: {
      const { data, page, totalCount } = action.payload;
      return {
        ...state,
        accounts: page > 0 ? [...state.accounts, ...data] : [...data],
        fetching: false,
        totalCount,
      };
    }
    case PROMOTE_USER_SUCCESS:
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account._id === action.payload.id) {
            return { ...account, role: 'ROLE_MODERATOR' } as Account;
          }
          return account;
        }),
      };
    default:
      return state;
  }
};

// ---ACTIONS---

export const accountsActions = {
  getAccountsSuccess: (data: Account[], totalCount: number, page: number) =>
    ({ type: GET_ACCOUNTS_SUCCESS, payload: { data, totalCount, page } } as const),
  getAccounts: (options: IGetAccountsOptions) =>
    ({ type: GET_ACCOUNTS, payload: { options } } as const),
  promoteUser: (id: string) => ({ type: PROMOTE_USER, payload: { id } } as const),
  promoteUserSuccess: (id: string) => ({ type: PROMOTE_USER_SUCCESS, payload: { id } } as const),
};

// ---SAGAS---

function* getAccountsWorker({
  payload,
}: ReturnType<typeof accountsActions.getAccounts>): Generator<
  StrictEffect,
  void,
  GetAccountsReturnType
> {
  try {
    const response = yield call(accountsServise.getAccounts, payload.options);
    yield put(
      accountsActions.getAccountsSuccess(response.data, response.totalCount, payload.options.page),
    );
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Штосцi не так, абнавiце старонку',
      }),
    );
  }
}

function* promoteUserWorker({
  payload,
}: ReturnType<typeof accountsActions.promoteUser>): Generator<StrictEffect, void, unknown> {
  try {
    debugger;
    const { id } = payload;
    yield call(accountsServise.promoteUser, id);
    yield put(accountsActions.promoteUserSuccess(id));
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Не удалося зрабiць юзера мадэратарам, абнавiце старонку',
      }),
    );
  }
}

// ---SAGAS_WATCHERS---

export const accountsSagas = [
  takeEvery(GET_ACCOUNTS, getAccountsWorker),
  takeEvery(PROMOTE_USER, promoteUserWorker),
];

export default accountsReducer;
