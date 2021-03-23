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
  Words = '/api/words',
  CreateAWord = '/api/word',
  ChangePassword = '/api/user/change-password',
  ResetPassword = '/api/user/reset-password',
  SendResetPasswordEmail = '/api/user/send-reset-password-email',
  ChangeEmail = '/api/user/change-email',
  ConfirmRegistration = '/api/user/confirm-registration',
  ResendConfirmNewEmailToken = 'api/user/resend-confirm-new-email-token',
  ConfirmEmail = '/api/user/confirm-email',
  CancelEmailChanging = 'api/user/cancel-email-changing',
  LikeAWord = '/api/word/like',
  DislikeAWord = '/api/word/dislike',
  RemoveLike = '/api/word/removelike',
}

export const wordUrlCreator = (page = 0, limit = 20) =>
  `${ApiRoute.Words}?page=${page}&limit=${limit}`;

export const rateAWordRouteCreator = (
  route: ApiRoute.LikeAWord | ApiRoute.DislikeAWord | ApiRoute.RemoveLike,
  id: string,
) => `${route}/${id}`;

export const apiRoutesCreator = (
  baseUrl: string,
  query: string,
  additionalUrl?: string,
): string => {
  return additionalUrl ? `${baseUrl}/${query}/${additionalUrl}` : `${baseUrl}/${query}`;
};
