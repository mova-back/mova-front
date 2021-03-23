export enum Page {
  Home = '/',
  Login = '/login',
  Signup = '/signup',
  Achievements = '/achievements',
  Settings = '/settings',
  Rules = '/rules',
  Dictionary = '/dictionary',
  AddWord = '/add',
  ForgetPassword = '/forget-password',
  ThankYou = '/thank-you',
  ChangePassword = '/change-password',
  Feedback = '/feedback',
  Logout = '/logout',
  DeleteAcc = '/delete-acc',
  ConfirmRegistration = '/confirm-registration',
  ResetPassword = '/reset-password',
  ChangeEmail = '/change-email',
  ConfirmEmail = '/confirm-email',
}

export enum ApiRoute {
  Api = '',
  User = '/api/user/current',
  Registration = '/api/user',
  Users = '/api/users',
  Refresh = '/api/auth/refresh-token',
  UsersLogin = '/api/auth/login',
  UsersLogout = '/api/auth/logout',
  DictionaryFeed = '/api/dictionary/feed',
  CreateAWord = '/api/dictionary/word',
  ChangePassword = '/api/user/change-password',
  ResetPassword = '/api/user/reset-password',
  SendResetPasswordEmail = '/api/user/send-reset-password-email',
  ChangeEmail = '/api/user/change-email',
  ConfirmRegistration = '/api/user/confirm-registration',
  ResendConfirmNewEmailToken = 'api/user/resend-confirm-new-email-token',
  ConfirmEmail = '/api/user/confirm-email',
  CancelEmailChanging = 'api/user/cancel-email-changing',
}

export const apiRoutesCreator = (
  baseUrl: string,
  query: string,
  additionalUrl?: string,
): string => {
  return additionalUrl ? `${baseUrl}/${query}/${additionalUrl}` : `${baseUrl}/${query}`;
};
