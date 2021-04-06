import { useHistory } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { call, delay, put, StrictEffect, take, takeEvery, takeLatest } from 'redux-saga/effects';
import User from '../../../models/user';
import HttpError from '../../../models/httpError';
import SignUpFormData from '../../../models/forms/signUpFormData';
import LoginFormData from '../../../models/forms/loginFormData';
import { InferActionsTypes } from '../../types';
import { notificationActions } from '../../notification/reducer/notificationReducer';
import NotificationTypes from '../../../constants/notificationTypes';
import { SignInResponseDataType, UserService } from '../../../services/UserService';
import { Page } from '../../../constants/paths';
import { ChangePasswordFormDataType } from '../../../models/forms/changePasswordData';
import ForgetPasswordData from '../../../models/forms/forgetPasswordData';
import { ResetPasswordDataType } from '../../../constants/forms/resetPassword';
import { ChangeEmailFormDataType } from '../../../components/App/ChangeEmail/type';

export type UserState = {
  readonly currentUser: User | null;
  readonly fetching: boolean;
  email: string;
  isError: boolean;
};

const initialState: UserState = {
  currentUser: null,
  fetching: false,
  email: '',
  isError: false,
};
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const REGISTRATION = 'REGISTRATION';
export const CONFIRM_REGISTRATION = 'CONFIRM_REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const SET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';
export const CONFIRM_PASSWORD = 'CONFIRM_PASSWORD';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CONFIRM_CHANGE_EMAIL = 'CONFIRM_CHANGE_EMAIL';
export const EMAIL_CHANGE_SUCCESS = 'EMAIL_CHANGE_SUCCESS';
export const EMAIL_CHANGE_ERROR = 'EMAIL_CHANGE_ERROR';

export type UserActionsType = InferActionsTypes<typeof userActions>;

const userReducer = (state: UserState = initialState, action: UserActionsType): UserState => {
  switch (action.type) {
    case REGISTRATION:
    case SET_CURRENT_USER:
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
        fetching: false,
      };
    case REGISTRATION_SUCCESS:
    case EMAIL_CHANGE_SUCCESS:
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
    case EMAIL_CHANGE_ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};

export const userActions = {
  login: (data: LoginFormData, meta: FormikHelpers<LoginFormData>) =>
    ({
      type: LOGIN,
      payload: { data, meta },
    } as const),

  loginSuccess: (data: User) => ({ type: LOGIN_SUCCESS, payload: data } as const),

  loginError: (error: HttpError) => ({ type: LOGIN_ERROR, payload: error } as const),

  logoutRequest: () => ({ type: LOGOUT_REQUEST } as const),

  logout: () => ({ type: LOGOUT } as const),

  logoutSuccess: () => ({ type: LOGOUT_SUCCESS } as const),

  logoutError: () => ({ type: LOGOUT_ERROR } as const),

  changePassword: (formData: ChangePasswordFormDataType) =>
    ({ type: CHANGE_PASSWORD, payload: { formData } } as const),

  changeEmail: (formData: ChangeEmailFormDataType) =>
    ({ type: CHANGE_EMAIL, payload: { formData } } as const),

  emailChangeError: () => ({ type: EMAIL_CHANGE_ERROR } as const),

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

  confirmChangeEmail: (query: string | null) =>
    ({ type: CONFIRM_CHANGE_EMAIL, payload: { query } } as const),

  confirmResetPassword: (
    password: string,
    resetPasswordToken: string | null,
    meta: FormikHelpers<ResetPasswordDataType>,
  ) => ({ type: CONFIRM_PASSWORD, payload: { password, resetPasswordToken, meta } } as const),

  registrationSuccess: (email: string) =>
    ({
      type: REGISTRATION_SUCCESS,
      payload: { email },
    } as const),

  emailChangeSuccess: (email: string) =>
    ({
      type: EMAIL_CHANGE_SUCCESS,
      payload: { email },
    } as const),

  resetPassword: (email: string, meta: FormikHelpers<ForgetPasswordData>) =>
    ({
      type: RESET_PASSWORD,
      payload: { email, meta },
    } as const),

  registrationError: (error: HttpError) =>
    ({
      type: REGISTRATION_ERROR,
      payload: error,
    } as const),

  setCurrentUser: () =>
    ({
      type: SET_CURRENT_USER,
      fetching: true,
    } as const),

  setCurrentUserSuccess: (user: User) =>
    ({
      type: GET_CURRENT_USER_SUCCESS,
      payload: user,
      fetching: false,
    } as const),
  setCurrentUserError: (error: HttpError) =>
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

export function* confirmChangeEmailWorker(
  action: ReturnType<typeof userActions.confirmChangeEmail>,
): Generator<StrictEffect, void, string> {
  const { query } = action.payload;
  try {
    let email = '';
    if (query) email = yield call(UserService.confirmChangeEmail, query);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Email changed',
      }),
    );
    yield put(userActions.emailChangeSuccess(email));
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
export function* confirmResetPasswordWorker(
  action: ReturnType<typeof userActions.confirmResetPassword>,
): Generator<StrictEffect, void, unknown> {
  const { password, resetPasswordToken } = action.payload;
  try {
    if (resetPasswordToken) {
      yield call(UserService.confirmResetPassword, { password, resetPasswordToken });
    }
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Password changed succesfully',
      }),
    );
  } catch (e) {
    const { meta } = action.payload;
    meta.setSubmitting(false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
    yield put(userActions.registrationError(e));
  }
}

export function* resetPasswordWorker({
  payload,
}: ReturnType<typeof userActions.resetPassword>): Generator<StrictEffect, void, unknown> {
  try {
    yield call(UserService.resetPassword, payload.email);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Check your email',
      }),
    );
    payload.meta.setSubmitting(false);
  } catch (e) {
    throw new Error(e);
  }
}

export function* setCurrentUserWorker(): Generator<StrictEffect, void, User> {
  try {
    const user: User = yield call(UserService.getCurrent);
    yield put(userActions.setCurrentUserSuccess(user));
  } catch (e) {
    yield put(userActions.setCurrentUserError(e));
  }
}

export function* signInWorker(): Generator<StrictEffect, void, any> {
  // this is an imitation of takeFirst(ACTION_NAME, workerSaga)
  while (true) {
    const action: ReturnType<typeof userActions.login> = yield take(LOGIN);
    try {
      const {
        payload: {
          data: { rememberMe, ...loginData },
        },
      } = action;
      const user: User = yield call(UserService.signIn, loginData);
      yield put(
        notificationActions.addNotification({
          type: NotificationTypes.success,
          message: 'Logged in',
        }),
      );
      yield put(userActions.loginSuccess(user));
    } catch (e) {
      const {
        payload: {
          meta: { resetForm, setSubmitting, setFieldError },
        },
      } = action;
      yield call(setSubmitting, false);
      if (e.response.status === 403) {
        yield call(setFieldError, 'password', 'Incorrect password');
      }
      if (e.response.status === 404) {
        yield call(setFieldError, 'email', 'There is no user with such email');
      }
      yield put(userActions.loginError(e));
    }
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

export function* changePasswordWorker({ payload }: ReturnType<typeof userActions.changePassword>) {
  try {
    const { meta } = payload.formData;
    yield call(UserService.changePassword, payload.formData);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Password was changed succesfully',
      }),
    );
    meta.setSubmitting(false);
  } catch (e) {
    const { meta } = payload.formData;
    meta.setSubmitting(false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: `Password cannot be changed now ${e.message}`,
      }),
    );
  }
}
export function* changeEmailWorker({ payload }: ReturnType<typeof userActions.changeEmail>) {
  try {
    const { meta } = payload.formData;
    yield call(UserService.changeEmail, payload.formData.newEmail);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Check your email',
      }),
    );
    meta.setSubmitting(false);
  } catch (e) {
    const { meta } = payload.formData;
    meta.setSubmitting(false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: `${e.message} :(`,
      }),
    );
  }
}

export const userSagas = [
  takeEvery(REGISTRATION, signUpWorker),
  takeLatest(SET_CURRENT_USER, setCurrentUserWorker),
  // takeEvery(LOGIN, signInWorker),
  signInWorker(),
  takeEvery(LOGOUT, signOutWorker),
  takeEvery(CONFIRM_REGISTRATION, confirmRegistrationWorker),
  takeEvery(CONFIRM_PASSWORD, confirmResetPasswordWorker),
  takeEvery(CHANGE_PASSWORD, changePasswordWorker),
  takeLatest(RESET_PASSWORD, resetPasswordWorker),
  takeLatest(CHANGE_EMAIL, changeEmailWorker),
  takeLatest(CONFIRM_CHANGE_EMAIL, confirmChangeEmailWorker),
];

export default userReducer;
