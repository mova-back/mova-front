// eslint-disable-next-line import/no-cycle
import { userActions } from './reducer/userReducer';
import User from '../../models/user';

export type RegistrationAction = ReturnType<typeof userActions.registration>;
export type LoginAction = ReturnType<typeof userActions.login>;
