import { FormikHelpers } from 'formik';
import User from '../../../models/user';
import HttpError from '../../../models/httpError';
import SignUpFormData from '../../../models/forms/signUpFormData';
import LoginFormData from '../../../models/forms/loginFormData';
import { InferActionsTypes } from '../../types';

export type UserState = {
  readonly currentUser: User | null;
  readonly fetching: boolean;
};

const initialState: UserState = {
  currentUser: null,
  fetching: false,
};
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REGISTRATION = 'REGISTRATION';
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
      return {
        ...state,
        fetching: true,
      };
    case LOGIN_SUCCESS:
    case REGISTRATION_SUCCESS:
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

  registration: (data: SignUpFormData, meta: FormikHelpers<SignUpFormData>) =>
    ({
      type: REGISTRATION,
      payload: data,
      meta,
    } as const),

  registrationSuccess: (user: User) =>
    ({
      type: REGISTRATION_SUCCESS,
      payload: user,
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

export default userReducer;
