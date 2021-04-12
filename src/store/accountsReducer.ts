// eslint-disable-next-line import/no-extraneous-dependencies
import { StrictEffect, takeEvery, call, put } from '@redux-saga/core/effects';
import NotificationTypes from '../constants/notificationTypes';
import accountsServise, { Account } from '../services/accountsServise';
import { notificationActions } from './notification/reducer/notificationReducer';
import { InferActionsTypes } from './types';

const GET_ACCOUNTS = 'accountsReducer/GET_ACCOUNTS';
const GET_ACCOUNTS_SUCCESS = 'accountsReducer/GET_ACCOUNTS_SUCCESS';
const PROMOTE_USER = 'accountsReducer/PROMOTE_USER';
const PROMOTE_USER_SUCCESS = 'accountsReducer/PROMOTE_USER_SUCCESS';

type AccountsReducerStateType = {
  accounts: Account[];
  fetching: boolean;
};

const initialState = {
  accounts: [],
  fetching: false,
};

type AccountsActionsType = InferActionsTypes<typeof accountsActions>;
const accountsReducer = (
  state: AccountsReducerStateType = initialState,
  action: AccountsActionsType,
) => {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        fetching: true,
      };
    case GET_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.payload.data, fetching: false };
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
  getAccountsSuccess: (data: Account[]) =>
    ({ type: GET_ACCOUNTS_SUCCESS, payload: { data } } as const),
  getAccounts: () => ({ type: GET_ACCOUNTS } as const),
  promoteUser: (id: string) => ({ type: PROMOTE_USER, payload: { id } } as const),
  promoteUserSuccess: (id: string) => ({ type: PROMOTE_USER_SUCCESS, payload: { id } } as const),
};

// ---SAGAS---

function* getAccountsWorker(): Generator<StrictEffect, void, Account[]> {
  try {
    const accounts = yield call(accountsServise.getAccounts);
    yield put(accountsActions.getAccountsSuccess(accounts));
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
