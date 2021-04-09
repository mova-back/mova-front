/* eslint-disable */
import { combineReducers } from 'redux';
import userReducer from './user/reducer/userReducer';
import notificationReducer from './notification/reducer/notificationReducer';
import wordsReducer from './words/wordsReducer';
import accountsReducer from './accountsReducer';

export const rootReducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  word: wordsReducer,
  accounts: accountsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
