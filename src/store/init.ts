import { all, call, delay } from 'redux-saga/effects';
import { hasRefreshToken, refreshTokens } from '../services/auth.service';
import { userActions } from './user/reducer/userReducer';

// eslint-disable-next-line import/prefer-default-export
export function* init(store: any) {
  try {
    yield delay(100);
    const { currentUser } = store.getState().user;
    if (hasRefreshToken() && !currentUser) {
      debugger;
      yield call(refreshTokens);
      store.dispatch(userActions.setCurrentUser());
    }
  } catch (e) {
    throw new Error(e);
  }
}
