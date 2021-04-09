import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import NewWordPage from '../pages/NewWordPage';
import ThankYouPage from '../pages/ThankYouPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import RulesPage from '../pages/RulesPage';
import SettingsPage from '../pages/SettingsPage';
import FeedbackPage from '../pages/FeedbackPage';
import LogoutPage from '../pages/LogoutPage';
import DeleteAccPage from '../pages/DeleteAccPage';
import { Page } from './paths';
import MyDictionaryPage from '../pages/MyDictionaryPage';
import ConfirmRegistrationPage from '../pages/ConfirmRegistrationOrMailPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ChangeEmailPage from '../pages/ChangeEmailPage';
import ChangeWordPage from '../pages/ChangeWordPage';
import ModeratorFeedPage from '../pages/ModeratorFeedPage';
import AccountsPage from '../pages/AccountsPage';

const ROUTES = [
  {
    path: Page.Home,
    exact: true,
    component: MainPage,
  },
  {
    path: Page.Login,
    exact: true,
    component: LoginPage,
  },
  {
    path: Page.Logout,
    exact: true,
    component: LogoutPage,
  },
  {
    path: Page.Signup,
    exact: true,
    component: SignUpPage,
  },
  {
    path: Page.ForgetPassword,
    exact: true,
    component: ForgetPasswordPage,
  },
  {
    path: Page.Achievements,
    exact: true,
    component: MainPage,
  },
  {
    path: Page.Settings,
    exact: true,
    component: SettingsPage,
  },
  {
    path: Page.Rules,
    exact: true,
    component: RulesPage,
  },
  {
    path: Page.AddWord,
    exact: true,
    component: NewWordPage,
  },
  {
    path: Page.ThankYou,
    exact: true,
    component: ThankYouPage,
  },
  {
    path: Page.ChangePassword,
    exact: true,
    component: ChangePasswordPage,
  },
  {
    path: Page.ResetPassword,
    exact: false,
    component: ResetPasswordPage,
  },
  {
    path: [Page.ConfirmRegistration, Page.ConfirmEmail],
    exact: false,
    component: ConfirmRegistrationPage,
  },
  {
    path: Page.Feedback,
    exact: true,
    component: FeedbackPage,
  },
  {
    path: Page.DeleteAcc,
    exact: true,
    component: DeleteAccPage,
  },
  {
    path: Page.AddWord,
    exact: true,
    component: NewWordPage,
  },
  {
    path: Page.Dictionary,
    exact: true,
    component: MyDictionaryPage,
  },
  { path: Page.ChangeEmail, exact: true, component: ChangeEmailPage },
  { path: Page.ChangeWord, exact: false, component: ChangeWordPage },
  { path: Page.ModeratorFeed, exact: false, component: ModeratorFeedPage },
  { path: Page.Accounts, exact: false, component: AccountsPage },
];

export default ROUTES;
