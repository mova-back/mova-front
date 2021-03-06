import { combineReducers } from 'redux';
import userReducer from './user/reducer/userReducer';
import notificationReducer from './notification/reducer/notificationReducer';
import feedReducer from './feed/reducer/feedReducer';
// eslint-disable-next-line import/no-cycle
import wordsReducer from './words/wordsReducer';

const appReducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  feed: feedReducer,
  word: wordsReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type AppStore = ReturnType<typeof rootReducer>;

export default rootReducer;
