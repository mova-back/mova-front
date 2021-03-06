import { call, put, select, takeEvery } from 'redux-saga/effects';
import { InferActionsTypes } from '../types';
import NewWordData from '../../models/forms/newWordData';
import wordsService from '../../services/wordsService';
import { notificationActions } from '../notification/reducer/notificationReducer';
import NotificationTypes from '../../constants/notificationTypes';
// eslint-disable-next-line import/no-cycle
import { AppStore } from '../rootReducer';
import Word from '../../models/word';
import { feedActions } from '../feed/reducer/feedReducer';

// --CONSTANTS--
export const CREATE_A_NEW_WORD = 'wordReducer/CREATE_A_NEW_WORD';
const CREATE_A_NEW_WORD_SUCCESS = 'wordReducer/CREATE_A_NEW_WORD_SUCCESS';
const CREATE_A_NEW_WORD_ERROR = 'wordReducer/CREATE_A_NEW_WORD_ERROR';
const LIKE_A_WORD_SUCCESS = 'wordReducer/LIKE_A_WORD_SUCCESS';
const LIKE_A_WORD_ERROR = 'wordReducer/LIKE_A_WORD_ERROR';
const RATE_A_WORD = 'wordReducer/RATE_A_WORD';

type WordsActionType = InferActionsTypes<typeof wordsActions>;

const initialState = {
  isFetching: false,
};

// --REDUCER--

const wordsReducer = (state: any = initialState, action: WordsActionType) => {
  switch (action.type) {
    case CREATE_A_NEW_WORD:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_A_NEW_WORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

// --ACTION-CREATORS--

export const wordsActions = {
  fetchCreateANewWord: (newWord: NewWordData, meta: any) =>
    ({ type: CREATE_A_NEW_WORD, payload: { newWord, meta } } as const),
  createANewWordSuccess: () =>
    ({
      type: CREATE_A_NEW_WORD_SUCCESS,
    } as const),
  createANewWordError: () =>
    ({
      type: CREATE_A_NEW_WORD_ERROR,
    } as const),
  rateAWord: (id: string, ratingType: string) => ({
    type: RATE_A_WORD,
    payload: { id, ratingType },
  }),
};

// --WORKER-SAGAS--

export function* createANewWordWorker({
  payload,
}: ReturnType<typeof wordsActions.fetchCreateANewWord>) {
  const { meta, newWord } = payload;
  const { resetForm, setSubmitting } = meta;
  const result = {
    ...newWord,
    tags: newWord.tags.split(',').map((i) => i.trim()), // creating ['tag1', 'tag2'] from 'tag1, tag2'
  };
  try {
    yield call(wordsService.createANewWord, result);
    yield call(resetForm, null);
    yield call(setSubmitting, false);
    yield put(wordsActions.createANewWordSuccess());
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.success,
        message: 'Word has been added',
      })
    );
  } catch (e) {
    yield call(resetForm, null);
    yield call(setSubmitting, false);
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      })
    );
    yield put(wordsActions.createANewWordError());
  }
}

function* rateAWordWorker({
  payload,
}: ReturnType<typeof wordsActions.rateAWord>) {
  const { id, ratingType } = payload;
  try {
    const response =
      ratingType === 'like'
        ? yield call(wordsService.likeAWord, id)
        : yield call(wordsService.dislikeAWord, id);
    const feedState = yield select((_state: AppStore) => _state.feed);
    const newFeed = feedState.feed.map((_i: Word) => {
      const i = _i;
      if (ratingType === 'like') {
        const result =
          i.id === id
            ? { ...i, likes: response.data ? (i.likes += 1) : (i.likes -= 1) }
            : i;
        return result;
      }
      const result =
        i.id === id
          ? {
              ...i,
              dislikes: response.data ? (i.dislikes += 1) : (i.dislikes -= 1),
            }
          : i;
      return result;
    });
    yield put(feedActions.fetchFeedSuccess(newFeed, feedState.offset));
  } catch (e) {
    yield put(
      notificationActions.addNotification({
        type: NotificationTypes.error,
        message: e.message,
      })
    );
  }
}

// --WATCHER-SAGAS--
export const wordsSagas = [
  takeEvery(CREATE_A_NEW_WORD, createANewWordWorker),
  takeEvery(RATE_A_WORD, rateAWordWorker),
];

export default wordsReducer;
