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
  FavouriteWords = '/api/profile/favorites', // TODO rename to api/words/favourites
  MyWords = '/api/profile/mywords',
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
  AddFavourite = '/api/word/addfavorite',
  RemoveFavourite = '/api/word/removefavorite',
  DeleteWord = '/api/word',
}

export const wordUrlCreator = (page = 0, limit = 20): string =>
  `${ApiRoute.Words}?page=${page}&limit=${limit}`;

export const rateAWordRouteCreator = (
  route:
    | ApiRoute.LikeAWord
    | ApiRoute.DislikeAWord
    | ApiRoute.DeleteWord
    | ApiRoute.RemoveLike
    | ApiRoute.AddFavourite
    | ApiRoute.RemoveFavourite,
  id: string,
): string => `${route}/${id}`;
