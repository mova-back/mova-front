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
}

export enum ApiRoute {
  Api = '',
  User = '/api/user',
  Users = '/api/user',
  Refresh = '/api/user/refresh',
  UsersLogin = '/api/user/login',
  UsersLogout = '/api/user/logout',
  Dictionary = '/api/dictionary',
  DictionaryFeed = '/api/dictionary/feed',
  CreateAWord = '/api/dictionary/word',
}

export const apiRoutesCreator = (
  baseUrl: string,
  query: string,
  additionalUrl?: string
) => {
  return additionalUrl
    ? `${baseUrl}/${query}/${additionalUrl}`
    : `${baseUrl}/${query}`;
};
