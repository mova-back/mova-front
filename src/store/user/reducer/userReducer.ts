import { useHistory } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import User from '../../../models/user';
import HttpError from '../../../models/httpError';
import SignUpFormData from '../../../models/forms/signUpFormData';
import LoginFormData from '../../../models/forms/loginFormData';
import { InferActionsTypes } from '../../types';
import { notificationActions } from '../../notification/reducer/notificationReducer';
import NotificationTypes from '../../../constants/notificationTypes';
import { SignInResponseDataType, UserService } from '../../../services/UserService';
import { Page } from '../../../constants/paths';

export type UserState = {
  readonly currentUser: User | null;
  readonly fetching: boolean;
  email: string;
};

const initialState: UserState = {
  currentUser: null,
  fetching: false,
  email: '',
};
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REGISTRATION = 'REGISTRATION';
export const CONFIRM_REGISTRATION = 'CONFIRM_REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

export type UserActionsType = InferActionsTypes<typeof userActions>;

const userReducer = (state: UserState = initialState, action: UserActionsType): UserState => {
  switch (action.type) {
    case REGISTRATION:
    case GET_CURRENT_USER:
    case CONFIRM_REGISTRATION:
      return {
        ...state,
        fetching: true,
      };
    case LOGIN_SUCCESS:
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: { ...action.payload },
        fetching: false,
      };
    case REGISTRATION_ERROR:
    case GET_CURRENT_USER_ERROR:
      return {
        ...state,
        currentUser: null,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        fetching: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export const userActions = {
  login: (data: LoginFormData, meta: FormikHelpers<LoginFormData>) =>
    ({
      type: LOGIN,
      payload: data,
      meta,
    } as const),

  loginSuccess: (data: User) =>
    ({
      type: LOGIN_SUCCESS,
      payload: data,
    } as const),

  loginError: (error: HttpError) =>
    ({
      type: LOGIN_ERROR,
      payload: error,
    } as const),

  logoutRequest: () =>
    ({
      type: LOGOUT_REQUEST,
    } as const),

  logout: () =>
    ({
      type: LOGOUT,
    } as const),

  logoutSuccess: () =>
    ({
      type: LOGOUT_SUCCESS,
    } as const),

  logoutError: () =>
    ({
      type: LOGOUT_ERROR,
    } as const),

  registration: (
    data: SignUpFormData,
    meta: FormikHelpers<SignUpFormData>,
    history: ReturnType<typeof useHistory>,
  ) =>
    ({
      type: REGISTRATION,
      payload: { data, meta, history },
    } as const),
  confirmRegistration: (query: string | null) =>
    ({ type: CONFIRM_REGISTRATION, payload: { query } } as const),

  registrationSuccess: (email: string) =>
    ({
      type: REGISTRATION_SUCCESS,
      payload: { email },
    } as const),

  registrationError: (error: HttpError) =>
    ({
      type: REGISTRATION_ERROR,
      payload: error,
    } as const),

  getCurrentUser: () =>
    ({
      type: GET_CURRENT_USER,
    } as const),

  getCurrentUserSuccess: (user: User) =>
    ({
      type: GET_CURRENT_USER_SUCCESS,
      payload: user,
    } as const),
  getCurrentUserError: (error: HttpError) =>
    ({
      type: GET_CURRENT_USER_ERROR,
      payload: error,
    } as const),
};

// ---WORKER-SAGAS---

export function* signUpWorker({
  payload,
}: ReturnType<typeof userActions.registration>): Generator<
  StrictEffect,
  void,
  SignInResponseDataType
> {
  const { resetForm, setSubmitting } = payload.meta;
  const { history } = payload;
  try {
    yield call(UserService.signUp, payload.data);
    yield call(setSubmitting, false);
    history.push(Page.ThankYou);
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
    yield call(resetForm, {});
    yield call(setSubmitting, false);
    yield put(userActions.registrationError(e));
  }
}
export function* confirmRegistrationWorker(
  action: ReturnType<typeof userActions.confirmRegistration>,
): Generator<StrictEffect, void, string> {
  const { query } = action.payload;
  try {
    let email = '';
    console.log('This is query: ', query);
    if (query) email = yield call(UserService.confirmRegistration, query);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Registered',
      }),
    );
    yield put(userActions.registrationSuccess(email));
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
    yield put(userActions.registrationError(e));
  }
}

export function* getCurrentUserWorker(): Generator<StrictEffect, void, User> {
  try {
    const user: User = yield call(UserService.getCurrent);
    yield put(userActions.getCurrentUserSuccess(user));
  } catch (e) {
    yield put(userActions.getCurrentUserError(e));
  }
}

export function* signInWorker({
  payload,
  meta,
}: ReturnType<typeof userActions.login>): Generator<StrictEffect, void, User> {
  const { resetForm, setSubmitting } = meta;
  try {
    const { rememberMe, ...loginData } = payload;

    const user: User = yield call(UserService.signIn, loginData);
    // yield call(resetForm, null);
    // yield call(setSubmitting, false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Logged in',
      }),
    );
    yield put(userActions.loginSuccess(user));
  } catch (e) {
    yield call(resetForm, {});
    yield call(setSubmitting, false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
    yield put(userActions.loginError(e));
  }
}

export function* signOutWorker(): Generator<StrictEffect, void, unknown> {
  yield call(UserService.signOut);
  try {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Logged out',
      }),
    );
    yield put(userActions.logoutSuccess());
  } catch (e) {
    yield put(userActions.logoutError());
  }
}

export const userSagas = [
  takeEvery(REGISTRATION, signUpWorker),
  takeEvery(GET_CURRENT_USER, getCurrentUserWorker),
  takeEvery(LOGIN, signInWorker),
  takeEvery(LOGOUT, signOutWorker),
  takeEvery(CONFIRM_REGISTRATION, confirmRegistrationWorker),
];

export default userReducer;
