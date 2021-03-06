/* eslint-disable */
import { call, put, takeEvery } from "redux-saga/effects";
import { UserService } from "../../../services/UserService";
import { LoginAction, RegistrationAction } from "../types";
import NotificationTypes from "../../../constants/notificationTypes";
import { GET_CURRENT_USER, LOGIN, LOGOUT, REGISTRATION, userActions } from "../reducer/userReducer";
import { notificationActions } from "../../notification/reducer/notificationReducer";

export function* register({ payload, meta }: RegistrationAction) {
  const { resetForm, setSubmitting } = meta;
  try {
    const user = yield call(UserService.register, payload);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: "Registered"
      })
    );
    yield call(resetForm, null);
    yield call(setSubmitting, false);
    yield put(userActions.registrationSuccess(user));
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message
      })
    );
    yield call(resetForm, null);
    yield call(setSubmitting, false);
    yield put(userActions.registrationError(e));
  }
}

export function* getCurrentUser() {
  try {
    const user = yield call(UserService.getCurrent);
    yield put(userActions.getCurrentUserSuccess(user));
  } catch (e) {
    yield put(userActions.getCurrentUserError(e));
  }
}

export function* login({ payload, meta }: LoginAction) {
  const { resetForm, setSubmitting } = meta;
  try {
    const { rememberMe, ...loginData } = payload;
    const user = yield call(UserService.login, loginData);
    // yield call(resetForm, null);
    // yield call(setSubmitting, false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: "Logged in"
      })
    );
    yield put(userActions.loginSuccess(user));
  } catch (e) {
    yield call(resetForm, null);
    yield call(setSubmitting, false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message
      })
    );
    yield put(userActions.loginError(e));
  }
}

export function* logout() {
  yield call(UserService.logout);
  try {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: "Logged out"
      })
    );
    yield put(userActions.logoutSuccess());
  } catch (e) {
    yield put(userActions.logoutError());
  }
}

const userSagas = [
  takeEvery(REGISTRATION, register),
  takeEvery(GET_CURRENT_USER, getCurrentUser),
  takeEvery(LOGIN, login),
  takeEvery(LOGOUT, logout)
];

export default userSagas;
