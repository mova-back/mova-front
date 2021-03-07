import { combineReducers } from 'redux';
import userReducer from './user/reducer/userReducer';
import notificationReducer from './notification/reducer/notificationReducer';
import feedReducer from './feed/reducer/feedReducer';
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

export default rootReducer;
