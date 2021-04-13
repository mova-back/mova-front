/* eslint-disable */
import {
  call,
  delay,
  put,
  select,
  SelectEffect,
  StrictEffect,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { FormikHelpers } from 'formik';
import { AxiosResponse } from 'axios';
import { InferActionsTypes } from '../types';
import wordsService, { RateAWordResponseType } from '../../services/wordsService';
import { notificationActions } from '../notification/reducer/notificationReducer';
import NotificationTypes from '../../constants/notificationTypes';
import Word from '../../models/word';
import HttpError from '../../models/httpError';
import NewWordData from '../../models/forms/newWordData';
import { FeedReturnType, FeedService, ModeratorFeedReturnType } from '../../services/FeedService';
import { RootState } from '../rootReducer';
import { useHistory } from 'react-router-dom';
import {
  ApiRoute,
  FeedUrlOptionsType,
  ModeratorFeedUrlOptionsType,
  Page,
} from '../../constants/paths';
import {
  ModeratorWordCardInterface,
  WordCardInterface,
} from '../../components/App/Feed/WordCard/types';
import { hasRefreshToken } from '../../services/auth.service';

// --CONSTANTS--
export const CREATE_A_NEW_WORD = 'wordReducer/CREATE_A_NEW_WORD';
const CREATE_A_NEW_WORD_SUCCESS = 'wordReducer/CREATE_A_NEW_WORD_SUCCESS';
const CREATE_A_NEW_WORD_ERROR = 'wordReducer/CREATE_A_NEW_WORD_ERROR';
const LIKE_SUCCESS = 'wordReducer/LIKE_SUCCESS';
const LIKE_A_WORD_ERROR = 'wordReducer/LIKE_A_WORD_ERROR';
const RATE_A_WORD = 'wordReducer/RATE_A_WORD';
const FETCH_FEED = 'wordReducer/FETCH_FEED';
const FETCH_FEED_SUCCESS = 'wordReducer/FETCH_FEED_SUCCESSSSS';
const FETCH_FEED_ERROR = 'wordReducer/FETCH_FEED_ERROR';
const PURGE_FEED = 'wordReducer/PURGE_FEED';
const FETCH_MY_FAVOURITE_WORDS = 'wordsReducer/FETCH_MY_FAVOURITE_WORDS';
const REMOVE_LIKE_SUCCESS = 'wordsReducer/REMOVE_LIKE_SUCCESS';
const DISLIKE_SUCCESS = 'wordsReducer/DISLIKE_SUCCESS';
const ADD_FAVOURITE = 'wordsReducer/ADD_FAVOURITE';
const DELETE_WORD = 'wordsReducer/DELETE_WORD';
const DELETE_WORD_SUCCESS = 'wordsReducer/DELETE_WORD_SUCCESS';
const REMOVE_FAVOURITE = 'wordsReducer/REMOVE_FAVOURITE';
const ADD_FAVOURITE_SUCCESS = 'wordsReducer/ADD_FAVOURITE_SUCCESS';
const REMOVE_FAVOURITE_SUCCESS = 'wordsReducer/REMOVE_FAVOURITE_SUCCESS';
const CHANGE_WORD = 'wordsReducer/CHANGE_WORD';
const SET_CURRENTLY_MODIFIED_WORD = 'wordsReducer/SET_CURRENTLY_MODIFIED_WORD';
const REPORT_WORD = 'wordsReducer/REPORT_WORD';
const FETCH_MODERATOR_FEED = 'wordsReducer/FETCH_MODERATOR_FEED';
const FETCH_MODERATOR_FEED_SUCCESS = 'wordReducer/FETCH_MODERATOR_FEED_SUCCESS';
const REMOVE_WORD_FROM_MODERATOR_FEED = 'wordReducer/REMOVE_WORD_FROM_MODERATOR_FEED';

type WordsActionType = InferActionsTypes<typeof wordsActions>;

type ReducerState = {
  feed: WordCardInterface[];
  moderatorFeed: ModeratorWordCardInterface[];
  fetching: boolean;
  currentlyModifiedWord: NewWordData | null;
  totalCount: string;
};

const initialState: ReducerState = {
  feed: [],
  moderatorFeed: [],
  fetching: false,
  currentlyModifiedWord: null,
  totalCount: '0',
};

// --REDUCER--

const wordsReducer = (state: ReducerState = initialState, action: WordsActionType) => {
  switch (action.type) {
    case CREATE_A_NEW_WORD:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_A_NEW_WORD_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case FETCH_FEED:
    case FETCH_MODERATOR_FEED:
      const { page } = action.payload.options;
      return {
        ...state,
        fetching: page === 0 ? true : false,
      };

    case FETCH_FEED_ERROR:
      return {
        ...state,
        fetching: false,
      };
    case FETCH_FEED_SUCCESS: {
      const { data, page, totalCount } = action.payload;
      return {
        ...state,
        feed: page > 0 ? [...state.feed, ...data] : [...data],
        currentPage: page,
        fetching: false,
        totalCount: totalCount,
      };
    }
    case FETCH_MODERATOR_FEED_SUCCESS: {
      const { data, page, totalCount } = action.payload;
      return {
        ...state,
        moderatorFeed: page > 0 ? [...state.moderatorFeed, ...data] : [...data],
        currentPage: page,
        fetching: false,
        totalCount: totalCount,
      };
    }
    case LIKE_SUCCESS:
      return {
        ...state,
        feed: state.feed.map((word) => {
          if (word._id === action.payload.id) {
            if (action.payload.isDisliked) {
              // if dislike button has been pressed before
              return {
                ...word,
                dislikes: --word.dislikes,
                likes: ++word.likes,
                isLiked: true,
                isDisliked: false,
              };
            }
            // if only like button was pressed
            return {
              ...word,
              likes: ++word.likes,
              isLiked: true,
            };
          } else {
            return word;
          }
        }),
      };
    case DISLIKE_SUCCESS:
      return {
        ...state,
        feed: state.feed.map((word) => {
          if (word._id === action.payload.id) {
            if (action.payload.isLiked) {
              // if like button has been pressed before
              return {
                ...word,
                likes: --word.likes,
                dislikes: ++word.dislikes,
                isLiked: false,
                isDisliked: true,
              };
            }
            // if only dislike button was pressed
            return {
              ...word,
              dislikes: ++word.dislikes,
              isDisliked: true,
            };
          } else {
            return word;
          }
        }),
      };
    case REMOVE_LIKE_SUCCESS: {
      return {
        ...state,
        feed: state.feed.map((word) => {
          if (word._id === action.payload.id) {
            if (action.payload.isLiked) {
              return {
                ...word,
                likes: --word.likes,
                isLiked: false,
              };
            }
            return {
              ...word,
              dislikes: --word.dislikes,
              isDisliked: false,
            };
          } else {
            return word;
          }
        }),
      };
    }
    case ADD_FAVOURITE_SUCCESS:
      return {
        ...state,
        feed: state.feed.map((word) => {
          if (word._id === action.payload.id) {
            return {
              ...word,
              isFavourited: true,
            };
          } else {
            return word;
          }
        }),
      };
    case REMOVE_FAVOURITE_SUCCESS:
      return {
        ...state,
        feed: state.feed.map((word) => {
          if (word._id === action.payload.id) {
            return {
              ...word,
              isFavourited: false,
            };
          } else {
            return word;
          }
        }),
      };
    case DELETE_WORD_SUCCESS:
      return {
        ...state,
        feed: state.feed.filter((word) => word._id !== action.payload.id),
        moderatorFeed: state.moderatorFeed.filter((word) => word._id !== action.payload.id),
      };
    case SET_CURRENTLY_MODIFIED_WORD:
      return {
        ...state,
        currentlyModifiedWord: action.payload,
      };
    default:
      return state;
  }
};

// --ACTION-CREATORS--

export const wordsActions = {
  fetchCreateANewWord: (
    newWord: NewWordData,
    meta: FormikHelpers<NewWordData>,
    history: ReturnType<typeof useHistory>,
  ) => ({ type: CREATE_A_NEW_WORD, payload: { newWord, meta, history } } as const),

  createANewWordSuccess: () => ({ type: CREATE_A_NEW_WORD_SUCCESS } as const),

  createANewWordError: () => ({ type: CREATE_A_NEW_WORD_ERROR } as const),

  rateAWord: (id: string, ratingType: string, isLiked: boolean, isDisliked: boolean) =>
    ({
      type: RATE_A_WORD,
      payload: { id, ratingType, isLiked, isDisliked },
    } as const),

  fetchFeed: (options: FeedUrlOptionsType) => ({ type: FETCH_FEED, payload: { options } } as const),

  fetchFeedSuccess: (data: WordCardInterface[], totalCount: string, page: number) => {
    return {
      type: FETCH_FEED_SUCCESS,
      payload: {
        data,
        page,
        totalCount,
      },
    } as const;
  },

  fetchFeedError: (error: HttpError) => ({ type: FETCH_FEED_ERROR, payload: error } as const),

  fetchMyFavouriteWords: () => ({ type: FETCH_MY_FAVOURITE_WORDS } as const),

  likeSuccess: (id: string, isLiked: boolean, isDisliked: boolean) =>
    ({ type: LIKE_SUCCESS, payload: { id, isLiked, isDisliked } } as const),

  dislikeSuccess: (id: string, isLiked: boolean, isDisliked: boolean) =>
    ({ type: DISLIKE_SUCCESS, payload: { id, isLiked, isDisliked } } as const),

  removeLikeSuccess: (id: string, isLiked: boolean, isDisliked: boolean) =>
    ({ type: REMOVE_LIKE_SUCCESS, payload: { id, isLiked, isDisliked } } as const),

  deleteWord: (id: string) => ({ type: DELETE_WORD, payload: { id } } as const),

  removeWordFromModeratorFeed: (id: string) =>
    ({ type: REMOVE_WORD_FROM_MODERATOR_FEED, payload: { id } } as const),

  deleteWordSuccess: (id: string) => ({ type: DELETE_WORD_SUCCESS, payload: { id } } as const),

  addFavourite: (id: string) => ({ type: ADD_FAVOURITE, payload: { id } } as const),

  addFavouriteSuccess: (id: string) => ({ type: ADD_FAVOURITE_SUCCESS, payload: { id } } as const),

  removeFavourite: (id: string) => ({ type: REMOVE_FAVOURITE, payload: { id } } as const),

  removeFavouriteSuccess: (id: string) =>
    ({ type: REMOVE_FAVOURITE_SUCCESS, payload: { id } } as const),

  changeWord: (
    newWord: NewWordData,
    meta: FormikHelpers<NewWordData>,
    history: ReturnType<typeof useHistory>,
    id: string,
  ) => ({ type: CHANGE_WORD, payload: { id, newWord, meta, history } } as const),

  setCurrentlyModifiedWord: (currentWord: NewWordData) =>
    ({ type: SET_CURRENTLY_MODIFIED_WORD, payload: { ...currentWord } } as const),

  reportWord: (id: string, message: string) =>
    ({ type: REPORT_WORD, payload: { id, message } } as const),
  fetchModeratorFeed: (options: ModeratorFeedUrlOptionsType) =>
    ({ type: FETCH_MODERATOR_FEED, payload: { options } } as const),
  fetchModeratorFeedSuccess: (
    data: ModeratorWordCardInterface[],
    totalCount: string,
    page: number,
  ) => {
    return {
      type: FETCH_MODERATOR_FEED_SUCCESS,
      payload: {
        data,
        page,
        totalCount,
      },
    } as const;
  },
};

// --WORKER-SAGAS--

export function* createANewWordWorker({
  payload,
}: ReturnType<typeof wordsActions.fetchCreateANewWord>): Generator<StrictEffect, void, unknown> {
  const { meta, newWord, history } = payload;
  const { resetForm, setSubmitting } = meta;
  const result = {
    ...newWord,
    tags: newWord.tags.split(',').map((i) => i.trim()), // creating ['tag1', 'tag2'] from 'tag1, tag2'
  };
  try {
    yield call(wordsService.createANewWord, result);
    yield call(resetForm, {});
    yield call(setSubmitting, false);
    yield put(wordsActions.createANewWordSuccess());
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Word has been added',
      }),
    );
    history.push(Page.Home);
  } catch (e) {
    yield call(resetForm, {});
    yield call(setSubmitting, false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
    yield put(wordsActions.createANewWordError());
  }
}

function* rateAWordWorker({
  payload,
}: ReturnType<typeof wordsActions.rateAWord>): Generator<
  StrictEffect,
  void,
  RateAWordResponseType
> {
  const { ratingType, id, isLiked, isDisliked } = payload;
  try {
    if (ratingType === 'like') {
      if (isLiked) {
        // if a word has already been liked
        const response = yield call(wordsService.rateAWord, ApiRoute.RemoveLike, id);
        if (response.success) yield put(wordsActions.removeLikeSuccess(id, isLiked, isDisliked));
      } else {
        // just like a word
        const response = yield call(wordsService.rateAWord, ApiRoute.LikeAWord, id);
        if (response.success) yield put(wordsActions.likeSuccess(id, isLiked, isDisliked));
      }
    }
    if (ratingType === 'dislike') {
      if (isDisliked) {
        // if a word has already been disliked
        const response = yield call(wordsService.rateAWord, ApiRoute.RemoveLike, id);
        if (response.success) yield put(wordsActions.removeLikeSuccess(id, isLiked, isDisliked));
      } else {
        // just dislike a word
        const response = yield call(wordsService.rateAWord, ApiRoute.DislikeAWord, id);
        if (response.success) yield put(wordsActions.dislikeSuccess(id, isLiked, isDisliked));
      }
    }
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Something went wrong with rating this word',
      }),
    );
  }
}

export function* feedWorker(
  action: ReturnType<typeof wordsActions.fetchFeed>,
): Generator<StrictEffect, void, any> {
  try {
    const { options } = action.payload;
    if (options.search.length > 0) {
      yield delay(400);
    }
    const response: FeedReturnType = yield call(FeedService.fetchFeed, options);
    const user: string = yield select((state: RootState) => state.user.currentUser?._id);
    const result = response.feed.map((item) => {
      return {
        ...item,
        isFavourited: item.favoriteByUserdIds.includes(user),
        likes: item.likes.length,
        dislikes: item.dislikes.length,
        isLiked: item.likes.includes(user),
        isDisliked: item.dislikes.includes(user),
      };
    });
    const { page } = options;
    yield put(wordsActions.fetchFeedSuccess(result, response.totalCount, page));
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Штосцi пайшло не так... Абнавiце старонку',
      }),
    );
    yield put(wordsActions.fetchFeedError(e));
  }
}

export function* moderatorFeedWorker(
  action: ReturnType<typeof wordsActions.fetchModeratorFeed>,
): Generator<StrictEffect, void, any> {
  try {
    const { options } = action.payload;
    const response: ModeratorFeedReturnType = yield call(FeedService.fetchModeratorFeed, options);
    const user: string = yield select((state: RootState) => state.user.currentUser?._id);
    const result = response.feed.map((item) => {
      return {
        ...item,
        isFavourited: item.favoriteByUserdIds.includes(user),
        likes: item.likes.length,
        dislikes: item.dislikes.length,
        isLiked: item.likes.includes(user),
        isDisliked: item.dislikes.includes(user),
      };
    });
    const { page } = options;
    yield put(wordsActions.fetchModeratorFeedSuccess(result, response.totalCount, page));
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Штосцi пайшло не так... Абнавiце старонку',
      }),
    );
    yield put(wordsActions.fetchFeedError(e));
  }
}

function* addFavouriteWorker({ payload }: ReturnType<typeof wordsActions.addFavourite>) {
  try {
    const { id } = payload;
    yield call(wordsService.addFavourite, id);
    yield put(wordsActions.addFavouriteSuccess(id));
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: "Слова дабаулена у 'Словы са стужкi'",
      }),
    );
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
  }
}

function* removeFavouriteWorker({ payload }: ReturnType<typeof wordsActions.removeFavourite>) {
  try {
    const { id } = payload;
    yield call(wordsService.removeFavourite, id);
    yield put(wordsActions.removeFavouriteSuccess(id));
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: "Слова убрана з 'Словы са стужкi'",
      }),
    );
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
  }
}

function* deleteWordWorker({ payload }: ReturnType<typeof wordsActions.deleteWord>) {
  try {
    const { id } = payload;
    yield call(wordsService.deleteWord, id);
    yield put(wordsActions.deleteWordSuccess(id));
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Слова выдалена',
      }),
    );
  } catch (e) {
    console.error(e);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Не ўдалося выдаліць слова',
      }),
    );
  }
}

function* changeWordWorker({
  payload,
}: ReturnType<typeof wordsActions.changeWord>): Generator<StrictEffect, void, unknown> {
  const { meta, newWord, history, id } = payload;
  const { resetForm, setSubmitting } = meta;
  const result = {
    ...newWord,
    tags: newWord.tags.split(',').map((i) => i.trim()), // creating ['tag1', 'tag2'] from 'tag1, tag2'
  };
  try {
    yield call(wordsService.changeWord, result, id);
    yield call(resetForm, {});
    yield call(setSubmitting, false);
    yield put(wordsActions.createANewWordSuccess());
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Слова зменена',
      }),
    );
    // yield put(wordsActions.setCurrentlyModifiedWord(null));
    history.push(Page.Home);
  } catch (e) {
    yield call(resetForm, {});
    yield call(setSubmitting, false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      }),
    );
    yield put(wordsActions.createANewWordError());
  }
}

function* reportWordWorker({ payload }: ReturnType<typeof wordsActions.reportWord>) {
  try {
    const { id, message } = payload;
    yield call(wordsService.reportWord, id, message);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Дзякуй за паведамленне',
      }),
    );
  } catch (e) {
    console.error(e);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Не ўдалося паведамiць мадэратара',
      }),
    );
  }
}

function* removeWordFromModeratorFeedWorker({
  payload,
}: ReturnType<typeof wordsActions.removeWordFromModeratorFeed>) {
  try {
    const { id } = payload;
    yield call(wordsService.removeWordFromModeratorFeed, id);
    yield put(wordsActions.deleteWordSuccess(id));
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: 'Не ўдалося убраць слова',
      }),
    );
  }
}

// --WATCHER-SAGAS--
export const wordsSagas = [
  takeEvery(CREATE_A_NEW_WORD, createANewWordWorker),
  takeEvery(RATE_A_WORD, rateAWordWorker),
  takeLatest(FETCH_FEED, feedWorker),
  takeEvery(ADD_FAVOURITE, addFavouriteWorker),
  takeEvery(REMOVE_FAVOURITE, removeFavouriteWorker),
  takeEvery(CHANGE_WORD, changeWordWorker),
  takeEvery(DELETE_WORD, deleteWordWorker),
  takeEvery(REPORT_WORD, reportWordWorker),
  takeEvery(FETCH_MODERATOR_FEED, moderatorFeedWorker),
  takeEvery(REMOVE_WORD_FROM_MODERATOR_FEED, removeWordFromModeratorFeedWorker),
];

export default wordsReducer;
