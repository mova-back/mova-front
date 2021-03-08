/* eslint-disable */
import { combineReducers } from 'redux';
import userReducer from './user/reducer/userReducer';
import notificationReducer from './notification/reducer/notificationReducer';
import wordsReducer from './words/wordsReducer';

export const rootReducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  word: wordsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
