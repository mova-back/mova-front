import { RouteConfig } from 'react-router-config';
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

const ROUTES: RouteConfig[] = [
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
];

export default ROUTES;
